from pathlib import Path
from pydantic import BaseModel, Field
from tools.base import Tool, ToolKind, FileDiff, ToolResult, ToolInvocation
from utils.paths import resolve_path, ensure_parent_directory_exists

class EditFileToolParams(BaseModel):
    path: str = Field(
        ...,
        description="Path to the file to edit relative to the current working directory or absolute path"
    )
    old_string: str = Field(
        ...,
        description="The exact text to find and replace. Must match whitespace and indentation. For new files it will be empty"
    )
    new_string: str = Field(
        ...,
        description="The text to replace the old string with. Can be empty if we want to delete the old string"
    )
    replace_all: bool = Field(
        False,
        description="If true, will replace all occurrences of the old string"
    )

class EditFileTool(Tool):
    name = "edit_file"
    description = (
        "Edit a file by replacing a string with another string. "
        "The old string must match exactly including whitespace and indentation "
        "and must be unique in the file unless replace_all is true. Use this "
        "ONLY for a SINGLE replacement. "
        "CRITICAL: DO NOT use this tool multiple times in parallel! If you need to make "
        "multiple edits, you MUST use apply_patch instead. Multiple parallel edit_file "
        "calls will corrupt the file and are strictly forbidden."
    )
    kind = ToolKind.WRITE
    schema = EditFileToolParams

    async def execute(self, invocation: ToolInvocation)->ToolResult:
        params = EditFileToolParams(**invocation.params)
        path = resolve_path(invocation.cwd, params.path)

        if not path.exists():
            if params.old_string:
                return ToolResult.error_result(
                    error=f"File does not exist: {path}. To create new file, use an empty old string",
                    output=""
                )
            
            ensure_parent_directory_exists(path)
            content = params.new_string

            path.write_text(content, encoding="utf-8")
            
            line_count = len(params.new_string.splitlines())
            byte_count = len(params.new_string.encode('utf-8', errors='replace'))

            return ToolResult.success_result(
                output=f"Created new file: {path} {line_count} lines, {byte_count} bytes",
                diff=FileDiff(
                    path=path,
                    old_content="",
                    new_content=params.new_string,
                    is_new_file=True
                ),
                metadata={
                    'path': str(path),
                    'is_new_file': True,
                    'line_count': line_count,
                    'byte_count': byte_count
                }
            )
            
        old_content = path.read_text(encoding="utf-8")
        if not params.old_string:
            return ToolResult.error_result(
                error="old_string is required for editing existing files. Provide old_string to search for and new_string to replace it with",
                output=""
            )

        occurrences = old_content.count(params.old_string)
        if occurrences == 0:
            return self.no_match_error(params.old_string, old_content, path)

        if occurrences > 1 and not params.replace_all:
            return ToolResult.error_result(
                error=(
                    f"Found {occurrences} occurrences of old_string. "
                    f"Either provide more context to make the match unique, "
                    f"set replace_all=true to replace all occurrences, "
                    f"or use write_file for bulk edits."
                ),
                output="",
                metadata={
                    "occurence_count": occurrences
                }
            )
        
        if params.replace_all:
            new_content = old_content.replace(params.old_string, params.new_string)
            replace_count = occurrences
        else:
            new_content = old_content.replace(params.old_string, params.new_string, 1)
            replace_count = 1
        
        if new_content == old_content:
            return ToolResult.error_result(
                error="No changes made. old_string and new_string are identical",
                output=""
            )

        try:
            path.write_text(new_content, encoding="utf-8")
        except IOError as e:
            return ToolResult.error_result(
                error=f"Failed to write to file: {e}",
                output=""
            )

        line_diff = len(new_content.splitlines()) - len(old_content.splitlines())
        if line_diff > 0:
            diff_msg = f"+{line_diff} lines"
        elif line_diff < 0:
            diff_msg = f"-{abs(line_diff)} lines"
        else:
            diff_msg = "no line count change"

        return ToolResult.success_result(
            output=f"Edited file: {path} ({replace_count} replacement(s), {diff_msg})",
            diff=FileDiff(
                path=path,
                old_content=old_content,
                new_content=new_content,
                is_new_file=False
            ),
            metadata={
                'path': str(path),
                'replace_count': replace_count,
                'line_diff': line_diff,
                'diff_msg': diff_msg
            }
        )