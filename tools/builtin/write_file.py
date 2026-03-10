from tools.base import Tool
from pydantic import BaseModel, Field
from tools.base import ToolResult, FileDiff, ToolInvocation, ToolKind
from utils.paths import resolve_path, ensure_parent_directory_exists

class WriteFileParams(BaseModel):
    path: str = Field(...,
        description="Path to the file to write (relative to the current working directory or absolute path)"
    )
    content: str = Field(...,
        description="Content to write to the file"
    )   
    create_directory: bool = Field(False,
        description="Create the parent directory of the file if it does not exist"
    )
    overwrite: bool = Field(True,
        description="Overwrite the file if it already exists"
    )

class WriteFileTool(Tool):
    name: str = "write_file"
    description: str = "Write content to a file. Creates the file if it does not exist. Overwrites the file if it already exists. Parent directory of the file are created if they do not exist. Use this for creating new files or overwriting existing files. For partial modifications, use the edit tool instead."
    kind: ToolKind = ToolKind.WRITE
    schema: type[BaseModel] = WriteFileParams

    async def execute(self, invocation: ToolInvocation) -> ToolResult:
        params = WriteFileParams(**invocation.params)
        path = resolve_path(invocation.cwd, params.path)

        is_new_file = not path.exists()
        old_content = ""

        if not is_new_file:
            try:
                old_content = path.read_text(encoding="utf-8")
            except:
                pass

        try:
            if params.create_directory:
                ensure_parent_directory_exists(path)

            elif not path.parent.exists():
                return ToolResult.error_result(f"Parent directory does not exist : {path.parent}")
            
            path.write_text(params.content, encoding="utf-8")

            action = "Created" if is_new_file else "Updated"
            line_count = len(params.content.splitlines())

            return ToolResult.success_result(
                f"{action} file {path.name} with {line_count} lines",
                diff = FileDiff(
                    path = path,
                    old_content=old_content,
                    new_content=params.content,
                    is_new_file=is_new_file,
                ),
                metadata = {
                    'path': str(path),
                    'is_new_file': is_new_file,
                    'lines': line_count,
                    'bytes': len(params.content.encode('utf-8'))
                }
            )

        except OSError as e:
            return ToolResult.error_result(f"Error writing file: {e}")

        

    