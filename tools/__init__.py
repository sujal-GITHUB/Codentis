
__all__ = [
    "EditFileTool",
    "WriteFileTool",
    "ReadFileTool",
    "ApplyPatchTool",
    "ShellTool",
    "ListDirTool",
    "GrepTool",
    "GlobTool"
]

def get_all_builtin_tools()->list[type]:
    from tools.builtin.edit_file import EditFileTool
    from tools.builtin.write_file import WriteFileTool
    from tools.builtin.read_file import ReadFileTool
    from tools.builtin.apply_patch import ApplyPatchTool
    from tools.builtin.list_dir import ListDirTool
    from tools.builtin.grep import GrepTool
    from tools.builtin.glob import GlobTool
    from tools.builtin.shell import ShellTool
    
    return [
        ReadFileTool,
        WriteFileTool,
        EditFileTool,
        ApplyPatchTool,
        ShellTool,
        ListDirTool,
        GrepTool,
        GlobTool
    ]