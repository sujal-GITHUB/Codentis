from pathlib import Path
from pydantic import BaseModel, Field
import subprocess
import tempfile
import os

from tools.base import Tool, ToolKind, ToolResult, ToolInvocation

class FileEdit(BaseModel):
    path: str = Field(..., description="Path to the file to modify")
    old_string: str = Field(..., description="The exact old string to be replaced, including all whitespace and indentation")
    new_string: str = Field(..., description="The new string to replace it with")

class ApplyPatchToolParams(BaseModel):
    edits: list[FileEdit] = Field(
        ...,
        description="A list of edits to apply. Supply the exact old string and new string for each edit."
    )

class ApplyPatchTool(Tool):
    name = "apply_patch"
    description = (
        "Apply multiple exact text replacements across one or more files. This tool is HIGHLY PREFERRED "
        "and you MUST use this for making multiple separate edits within a single file or across multiple files. "
        "DO NOT use unified diff format. Instead, provide a list of exact text replacements for each file. "
        "Each 'old_string' MUST match the file contents EXACTLY, including all indentation and whitespace. "
        "If a string is not unique, include more context lines."
    )
    kind = ToolKind.WRITE
    schema = ApplyPatchToolParams

    async def execute(self, invocation: ToolInvocation) -> ToolResult:
        params = ApplyPatchToolParams(**invocation.params)
        cwd = invocation.cwd

        error_log = ""
        original_contents = {}
        file_contents = {}
        
        # Phase 1: validate and apply in memory
        for idx, edit in enumerate(params.edits):
            try:
                file_path = (cwd / edit.path).resolve()
                if not file_path.is_file():
                    error_log += f"Edit {idx+1} failed: File not found: {edit.path}\n"
                    continue
                
                try:
                    file_path.relative_to(cwd)
                except ValueError:
                    error_log += f"Edit {idx+1} failed: Path {edit.path} is outside workspace.\n"
                    continue

                if file_path not in file_contents:
                    orig_content = file_path.read_text(encoding='utf-8')
                    original_contents[file_path] = orig_content
                    file_contents[file_path] = orig_content
                    
                content = file_contents[file_path]
                
                if edit.old_string not in content:
                    match_err = self.no_match_error(edit.old_string, content, file_path)
                    error_log += f"Edit {idx+1} failed: {match_err.error}\n"
                    continue
                
                if content.count(edit.old_string) > 1:
                    error_log += f"Edit {idx+1} failed: Found multiple matches for old_string in {edit.path}, please include more context lines to make it unique.\n"
                    continue
                
                # Apply in memory
                file_contents[file_path] = content.replace(edit.old_string, edit.new_string)
                
            except Exception as e:
                error_log += f"Error processing edit {idx+1} for {edit.path}: {e}\n"

        if error_log:
            return ToolResult.error_result(f"Failed to apply patch due to errors. NO CHANGES WERE MADE:\n{error_log}", output="")
            
        # Phase 2: Compute overall diff and write all to disk
        consolidated_diff = ""
        from tools.base import FileDiff

        try:
            for file_path, content in file_contents.items():
                diff_obj = FileDiff(
                    path=file_path,
                    old_content=original_contents[file_path],
                    new_content=content
                )
                if diff_str := diff_obj.to_diff():
                    if consolidated_diff:
                        consolidated_diff += "\n"
                    consolidated_diff += diff_str
                    
                file_path.write_text(content, encoding='utf-8')
        except Exception as e:
            return ToolResult.error_result(f"Error saving files: {e}", output="")
        
        return ToolResult.success_result(
            output=f"Successfully applied {len(params.edits)} edits affecting {len(file_contents)} file(s).", 
            metadata={"edits_applied": len(params.edits)},
            diff=consolidated_diff
        )
