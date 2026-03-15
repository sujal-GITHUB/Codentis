
__all__ = [
    "EditFileTool",
    "WriteFileTool",
    "ReadFileTool",
    "ApplyPatchTool",
    "ShellTool",
    "ListDirTool",
    "GrepTool",
    "GlobTool",
    "TodoTool"
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
    from tools.builtin.web_search import WebSearchTool
    from tools.builtin.web_fetch import WebFetchTool
    from tools.builtin.ask_user import AskUserTool
    from tools.builtin.todo import TodoTool
    
    return [
        ReadFileTool,
        WriteFileTool,
        EditFileTool,
        ApplyPatchTool,
        ShellTool,
        ListDirTool,
        GrepTool,
        GlobTool,
        WebSearchTool,
        WebFetchTool,
        AskUserTool,
        TodoTool
    ]