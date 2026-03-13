from tools.base import Tool

def get_all_builtin_tools() -> list[type[Tool]]:
    from tools.builtin.read_file import ReadFileTool
    from tools.builtin.write_file import WriteFileTool
    from tools.builtin.shell import ShellTool
    from tools.builtin.edit_file import EditFileTool
    from tools.builtin.apply_patch import ApplyPatchTool
    from tools.builtin.list_dir import ListDirTool
    from tools.builtin.grep import GrepTool
    from tools.builtin.glob import GlobTool
    from tools.builtin.web_search import WebSearchTool
    from tools.builtin.web_fetch import WebFetchTool

    return [
        ReadFileTool,
        WriteFileTool,
        ShellTool,
        EditFileTool,
        ApplyPatchTool,
        ListDirTool,
        GrepTool,
        GlobTool,
        WebSearchTool,
        WebFetchTool
    ]
