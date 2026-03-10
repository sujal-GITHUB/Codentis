from tools.builtin.read_file import ReadFileTool
from tools.builtin.write_file import WriteFileTool
from tools.builtin.shell import ShellTool
from tools.builtin.edit_file import EditFileTool
from tools.builtin.apply_patch import ApplyPatchTool
from tools.base import Tool

__all__ = [
    "ReadFileTool",
    "WriteFileTool",
    "ShellTool",
    "EditFileTool",
    "ApplyPatchTool",
]

def get_all_builtin_tools() -> list[type[Tool]]:
    return [
        ReadFileTool,
        WriteFileTool,
        ShellTool,
        EditFileTool,
        ApplyPatchTool,
    ]
