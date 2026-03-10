from tools.builtin.edit_file import EditFileTool
from tools.builtin.write_file import WriteFileTool
from tools.builtin.read_file import ReadFileTool
from tools.builtin.apply_patch import ApplyPatchTool

__all__ = [
    "EditFileTool",
    "WriteFileTool",
    "ReadFileTool",
    "ApplyPatchTool"
]

def get_all_builtin_tools()->list[type]:
    return [
        ReadFileTool,
        WriteFileTool,
        EditFileTool,
        ApplyPatchTool
    ]