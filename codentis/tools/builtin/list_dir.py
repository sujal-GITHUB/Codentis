from codentis.tools.base import Tool, ToolResult, ToolKind, ToolInvocation
from pydantic import BaseModel, Field
from codentis.utils.paths import resolve_path

class ListDirParams(BaseModel):
    path: str = Field('.', description="The path to the directory to list. Defaults to current directory.")
    include_hidden: bool = Field(False, description="Include hidden files and directories. Defaults to False.")
    max_depth: int = Field(0, description="Maximum depth to traverse. 0 means only the current directory.")
    max_items: int = Field(100, description="Maximum number of items to list. Defaults to 100.")
    recursive: bool = Field(False, description="Recursively list directories. Defaults to False.")

class ListDirTool(Tool):
    name = "list_dir"
    description = "List the contents of a directory."
    kind = ToolKind.READ
    schema = ListDirParams
    
    async def execute(self, invocation: ToolInvocation) -> ToolResult:
        params = ListDirParams(**invocation.params)
        dir_path = resolve_path(invocation.cwd, params.path)

        if not dir_path.exists() or not dir_path.is_dir():
            return ToolResult.error_result(f"Directory not found: {dir_path}")

        try:
            items = sorted(dir_path.iterdir(), key=lambda x: (not x.is_dir(), x.name))
            
        except Exception as e:
            return ToolResult.error_result(f"Error listing directory: {e}")
        
        if not params.include_hidden:
            items = [item for item in items if not item.name.startswith('.')]
        
        if params.max_depth > 0:
            items = items[:params.max_depth]
        
        if params.max_items > 0:
            items = items[:params.max_items]
        
        if not items:
            return ToolResult.success_result(
                f"No items found in the directory: {dir_path}",
                metadata={
                    "path": str(dir_path),
                    "include_hidden": params.include_hidden,
                    "max_depth": params.max_depth,
                    "max_items": params.max_items,
                    "recursive": params.recursive,
                    "entries": 0
                }
            )

        lines = []
        for item in items:
            if item.is_dir():
                lines.append(f"{item.name}/")
            else:
                lines.append(f"{item.name}")
        
        return ToolResult.success_result(
            "\n".join(lines),
            metadata={
                "path": str(dir_path),
                "include_hidden": params.include_hidden,
                "max_depth": params.max_depth,
                "max_items": params.max_items,
                "recursive": params.recursive,
                "entries": len(items)
            }
        )