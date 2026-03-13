from codentis.tools.base import Tool, ToolResult, ToolKind, ToolInvocation
from pydantic import BaseModel, Field
from codentis.utils.paths import resolve_path
import re
import os
import sys
from codentis.utils.paths import is_binary_file
from pathlib import Path

class GrepParams(BaseModel):
    pattern: str = Field(..., description="The pattern to search for.")
    path: str = Field('.', description="The path to the file or directory to search in. Defaults to current directory.")
    case_insensitive: bool = Field(False, description="Perform case-insensitive search. Defaults to False.")
    recursive: bool = Field(False, description="Recursively search in subdirectories. Defaults to False.")

class GrepTool(Tool):
    name = "grep"
    description = "Search for a regex pattern in file contents. Returns a list of matching lines with line numbers."
    kind = ToolKind.READ
    schema = GrepParams
    
    async def execute(self, invocation: ToolInvocation) -> ToolResult:
        params = GrepParams(**invocation.params)
        search_path = resolve_path(invocation.cwd, params.path)

        if not search_path.exists():
            return ToolResult.error_result(f"Path not found: {search_path}")

        try:
            flags = re.IGNORECASE if params.case_insensitive else 0
            pattern = re.compile(params.pattern, flags)
            
        except Exception as e:
            return ToolResult.error_result(f"Error compiling pattern: {e}")
        
        if search_path.is_dir():
            files = self.find_files(search_path)
        else:
            files = [search_path]

        output_lines = []
        matches = 0
        for file_path in files:
            try:
                content = file_path.read_text(encoding="utf-8")        
            except Exception as e:
                return ToolResult.error_result(f"Error reading file: {e}")
            
            lines = content.splitlines()
            file_matches = False

            for i, line in enumerate(lines, 1):
                if pattern.search(line):
                    matches += 1
                    if not file_matches:
                        relative_path = file_path.relative_to(invocation.cwd)
                        output_lines.append(f" === {relative_path} ===")
                        file_matches = True
                    output_lines.append(f"{i}: {line}")
            
            if file_matches:
                output_lines.append("")
        
        if not output_lines:
            return ToolResult.success_result(
                f"No matches found for pattern : {params.pattern}",
                metadata={
                    "path": str(search_path),
                    "matches": 0,
                    "files_searched": len(files)
                }
            )

        if matches > 1000:
            output_lines.append(f"... {len(matches) - 1000} more matches not shown...")

        return ToolResult.success_result(
            "\n".join(output_lines),
            metadata={
                "path": str(search_path),
                "matches": matches,
                "files_searched": len(files)
            }
        )
        
    def find_files(self,search_path: Path) -> list[Path]:
        files = []
        for root, dirs, filenames in os.walk(search_path):
            dirs[:] = [d for d in dirs if d not in {"node_modules", "venv", ".venv", "build", "dist", "__pycache__", "target", ".git", ".vscode", ".idea", "out"}]
            for filename in filenames:
                if filename.startswith('.'):
                    continue

                file_path = Path(root) / filename

                if not is_binary_file(file_path):
                    files.append(file_path)
                    if len(files) >= 500:
                        return files
        return files