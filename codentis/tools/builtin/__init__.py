from codentis.tools.base import Tool

def get_all_builtin_tools() -> list[type[Tool]]:
    from codentis.tools.builtin.read_file import ReadFileTool
    from codentis.tools.builtin.write_file import WriteFileTool
    from codentis.tools.builtin.shell import ShellTool
    from codentis.tools.builtin.edit_file import EditFileTool
    from codentis.tools.builtin.apply_patch import ApplyPatchTool
    from codentis.tools.builtin.list_dir import ListDirTool
    from codentis.tools.builtin.grep import GrepTool
    from codentis.tools.builtin.glob import GlobTool
    from codentis.tools.builtin.web_search import WebSearchTool
    from codentis.tools.builtin.web_fetch import WebFetchTool

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
