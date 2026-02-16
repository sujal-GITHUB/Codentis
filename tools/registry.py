from typing import Any
from pathlib import Path
from tools.base import Tool, ToolResult, ToolInvocation
import logging
from tools.builtin import get_all_builtin_tools

logger = logging.getLogger(__name__)

class ToolRegistry:
    def __init__(self):
        self.tools: dict[str, Tool] = {}
    
    def register(self, tool: Tool):
        if tool.name in self.tools:
            logger.warning(f"Tool {tool.name} already registered, skipping")
            return

        self.tools[tool.name] = tool
        logger.debug(f"Registered tool: {tool.name}")

    def unregister(self, name: str):
        if name not in self.tools:
            logger.warning(f"Tool {name} not found")
            return

        del self.tools[name]
        logger.debug(f"Unregistered tool: {name}")

    def get(self, name: str) -> Tool | None:
        if name in self.tools:
            return self.tools[name]
        else:
            logger.warning(f"Tool {name} not found")
            return None

    def get_tools(self) -> list[Tool]:
        return list(self.tools.values())
    
    def get_schemas(self) -> list[dict[str, Any]]:
        return [tool.to_openai_schema() for tool in self.get_tools()]
    
    async def invoke(self, name: str, params: dict[str, Any], cwd: Path)->ToolResult:
        tool = self.get(name)
        if tool is None:
            return ToolResult.error_result(
                f"Tool {name} not found",
                metadata={
                    "tool_name": name,
                    "available_tools": list(self.tools.keys())
                }
            )
        
        validation_error = tool.validate_params(params)
        if validation_error:
            return ToolResult.error_result(
                f"Invalid parameters: {'; '.join(validation_error)}",
                metadata={
                    "tool_name": name,
                    "validation_error": validation_error
                }
            )
        
        invocation = ToolInvocation(
            params=params,
            cwd=cwd
        )

        try:
            result = await tool.execute(invocation)
        except Exception as e:
            logger.exception(f"Error invoking tool {name}: {e}")
            result = ToolResult.error_result(
                f"Internal error invoking tool {name}: {e}",
                metadata={
                    "tool_name": name,
                    "error": str(e)
                }
            )

        return result

def create_default_registry() -> ToolRegistry:
    registry = ToolRegistry()

    for tool_class in get_all_builtin_tools():
        registry.register(tool_class())
    
    return registry