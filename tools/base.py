from __future__ import annotations
import abc
from enum import Enum
from typing import Any
from pydantic import BaseModel
from dataclasses import dataclass
from pathlib import Path
from pydantic import ValidationError
from dataclasses import field
from config.config import Config

class ToolKind(Enum):
    READ = "read"
    WRITE = "write"
    SHELL = "shell"
    NETWORK = "network"
    MEMORY = "memory"
    MCP = "mcp"

@dataclass
class FileDiff:
    path: Path
    old_content: str
    new_content: str
    is_new_file: bool = False
    is_deletion: bool = False
    
    def to_diff(self) -> str:
        import difflib

        old_lines = self.old_content.splitlines(keepends=True)
        new_lines = self.new_content.splitlines(keepends=True)

        if old_lines and not old_lines[-1].endswith('\n'):
            old_lines[-1] += '\n'
        if new_lines and not new_lines[-1].endswith('\n'):
            new_lines[-1] += '\n'

        path_str = str(self.path)

        if self.is_new_file:
            # difflib produces no hunks when old is empty; build the header manually
            diff_lines = [
                f"--- /dev/null\n",
                f"+++ {path_str}\n",
            ]
            if new_lines:
                diff_lines.append(f"@@ -0,0 +1,{len(new_lines)} @@\n")
                diff_lines.extend(f"+{line}" for line in new_lines)
            return "".join(diff_lines)

        if self.is_deletion:
            diff_lines = [
                f"--- {path_str}\n",
                f"+++ /dev/null\n",
            ]
            if old_lines:
                diff_lines.append(f"@@ -1,{len(old_lines)} +0,0 @@\n")
                diff_lines.extend(f"-{line}" for line in old_lines)
            return "".join(diff_lines)

        result = "".join(difflib.unified_diff(
            old_lines,
            new_lines,
            fromfile=path_str,
            tofile=path_str,
        ))
        return result or "(no changes)"

@dataclass
class ToolInvocation:
    params: dict[str, Any] 
    cwd: Path

@dataclass
class ToolResult:
    success: bool
    output: str
    error: str | None = None
    metadata: dict[str, Any] = field(default_factory=dict)
    truncated: bool = False
    diff: FileDiff | str | None = None
    exit_code: int | None = None

    @classmethod
    def error_result(cls, error: str, output: str = "", **kwargs) -> ToolResult:
        return cls(success=False, output=output, error=error, **kwargs)

    @classmethod
    def success_result(cls, output: str, **kwargs: Any) -> ToolResult:
        return cls(success=True, output=output, error=None, **kwargs)

    def to_model_output(self)->str:
        if self.success:
            return self.output

        return f"Error: {self.error}\n\nOutput:\n{self.output}\n"

@dataclass
class ToolConfirmation:
    params: dict[str, Any]
    tool_name: str
    description: str

class Tool(abc.ABC):
    name: str = "base_tool"
    description: str = "Base tool"
    kind: ToolKind = ToolKind.READ

    def __init__(self, config: Config):
        self.config = config

    @property
    def schema(self)->dict[str, Any] | type["BaseModel"]:
        raise NotImplementedError("Tool must define schema property or class attribute")

    @abc.abstractmethod
    async def execute(self,invocation: ToolInvocation)->Any:
        raise NotImplementedError("Tool must define execute method")

    def validate_params(self, params: dict[str, Any])->list[str]:
        schema = self.schema
        if isinstance(schema, type) and issubclass(schema, BaseModel):
            try:
                schema(**params)
            except ValidationError as e:
                errors = []
                for error in e.errors():
                    field = ".".join(str(x) for x in error.get("loc", []))
                    message = error.get("msg", "Unknown error")
                    errors.append(f"Parameter {field}: {message}")
                return errors
            except Exception as e:
                return [str(e)] 
    
    def is_mutating(self, params: dict[str, Any])->bool:
        return self.kind in {ToolKind.WRITE, ToolKind.SHELL, ToolKind.NETWORK, ToolKind.MEMORY}

    async def get_confirmation(self, invocation: ToolInvocation)->ToolInvocation | None:
        if not self.is_mutating(invocation.params):
            return None

        return ToolConfirmation(
            params=invocation.params,
            tool_name=self.name,
            description=self.description
        )

    def no_match_error(self, old_string: str, old_content: str, path: Path | str) -> ToolResult:
        lines = old_content.splitlines()
        partial_matches = []
        search_terms = old_string.split()[:5]

        if search_terms:
            first_term = search_terms[0]
            for i, line in enumerate(lines, 1):
                partial_matches.append((i, line.strip()[:80]))
                if len(partial_matches) >= 3:
                    break

        error_msg = f"old_string not found in {path}"

        if partial_matches:
            error_msg += f"\nPossible matches:"
            for line_num, line_content in partial_matches:
                error_msg += f"\n  {line_num}: {line_content}"
            error_msg += f"\nMake sure old_string matches exactly (including whitespace and indentation)"
        else:
            error_msg += (
                "\nNo partial matches found. The string may be too long, contain special characters, or not exist in the file."
                "\nIf you are trying to create a new file, use an empty old_string."
                "\nIf you are trying to replace a string, make sure it exists in the file."
                "\nIf you are trying to delete a string, make sure it exists in the file."
                "\nTry re-reading the file to confirm the content"
            )

        return ToolResult.error_result(
            error=error_msg,
            output=""
        )

    def to_openai_schema(self)->dict[str, Any]:
        schema = self.schema

        if isinstance(schema, type) and issubclass(schema, BaseModel):
            json_schema = schema.model_json_schema(mode="serialization")

            return {
                "name": self.name,
                "description": self.description,
                "parameters": {
                    'type': 'object',
                    'properties': json_schema.get('properties', {}),
                    'required': json_schema.get('required', [])
                }
            }

        if isinstance(schema, dict):
            result = {
                "name": self.name,
                "description": self.description,
            }

            if "parameters" in schema:
                result["parameters"] = schema["parameters"]
            else:
                result["parameters"] = schema

            return result

        raise ValueError(f"Invalid schema type for tool {self.name}: {type(schema)}")