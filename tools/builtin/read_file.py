from pydantic import BaseModel
from tools.base import Tool
from pydantic import Field
from tools.base import ToolInvocation, ToolResult, ToolKind
from utils.paths import resolve_path, is_binary_file
from utils.text import count_tokens, truncate_text

class ReadFileParams(BaseModel):
    path: str = Field(...,
        description="Path to the file to read"
    )

    offset: int = Field(1, ge=1, description="Offset to start reading from (1-indexed)")
    limit: int | None = Field(None, ge=1, description="Number of lines to read")

class ReadFileTool(Tool):
    name: str = "read_file"
    description = (
        "Read the contents of a text file. Returns the file contents with line numbers."
        "For large files, use offset and limit to read only a portion of the file."
        "Cannot read binary files."
    )
    kind: ToolKind = ToolKind.READ
    schema: type[BaseModel] = ReadFileParams

    MAX_FILE_SIZE = 1024*1024*10
    MAX_OUTPUT_TOKENS = 25000

    async def execute(self, invocation: ToolInvocation) -> ToolResult:
        params = ReadFileParams(**invocation.params)
        path = resolve_path(invocation.cwd, params.path)

        if not path.exists():
            return ToolResult.error_result("File not found")

        if not path.is_file():
            return ToolResult.error_result("Path is not a file")

        file_size = path.stat().st_size
        if file_size > self.MAX_FILE_SIZE:
            return ToolResult.error_result(
                f"File is too large ({file_size / (1024*1024):.1f} MB)"
                f"Maximum file size is {self.MAX_FILE_SIZE / (1024*1024)} MB"
            )
          
        if is_binary_file(path):
            file_size_mb = file_size / (1024*1024)
            size_str = f"{file_size_mb:.2f} MB" if file_size >= 1 else f"{file_size} bytes"
            return ToolResult.error_result(
                f"Cannot read binary file: {path.name} ({size_str})"
                f"Condentis can only read text files."
            )
        
        try:
            try:
                content = path.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                content = path.read_text(encoding="latin-1")
            
            lines = content.splitlines()
            total_lines = len(lines)

            if total_lines == 0:
                return ToolResult.success_result("File is empty.", metadata={"total_lines": total_lines})

            start_idx = max(0, params.offset-1)
            
            if params.limit is not None:
                end_idx = min(start_idx + params.limit, total_lines)
            else:
                end_idx = total_lines

            selected_lines = lines[start_idx:end_idx]
            formatted_lines = []

            for i, line in enumerate(selected_lines, start=start_idx + 1):
                formatted_lines.append(f"{i:6} | {line}")

            output = "\n".join(formatted_lines)
            token_count = count_tokens(output, "arcee-ai/trinity-large-preview:free")

            truncated = False
            if token_count > self.MAX_OUTPUT_TOKENS:
                output = truncate_text(
                    output, 
                    self.MAX_OUTPUT_TOKENS, 
                    "gpt-4o", 
                    suffix=f"\n...[Truncated {total_lines} lines]"
                )
                truncated = True
            
            metadata_lines = []
            if start_idx > 0 or end_idx < total_lines:
                metadata_lines.append(
                    f"Read {start_idx-1}-{end_idx} of {total_lines} lines from {path.name}"
                )

            if metadata_lines:
                header = " | ".join(metadata_lines)+"\n\n"
                output = header + output

            return ToolResult.success_result(
                output,
                truncated=truncated,
                metadata={
                    "path": str(path),
                    "total_lines": total_lines,
                    'shown_start': start_idx+1,
                    'shown_end': end_idx,
                    "lines_read": len(selected_lines),
                }
            )
        except Exception as e:
            return ToolResult.error_result(f"Error reading file: {e}")