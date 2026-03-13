"""Platform detection and command helpers."""
import platform
import sys


def get_platform_name() -> str:
    """Get normalized platform name: 'Windows', 'Darwin', or 'Linux'."""
    return platform.system()


def get_platform_type() -> str:
    """Get simplified platform type: 'windows', 'macos', or 'linux'."""
    system = platform.system()
    if system == "Windows":
        return "windows"
    elif system == "Darwin":
        return "macos"
    else:
        return "linux"


def is_windows() -> bool:
    """Check if running on Windows."""
    return platform.system() == "Windows"


def is_macos() -> bool:
    """Check if running on macOS."""
    return platform.system() == "Darwin"


def is_linux() -> bool:
    """Check if running on Linux."""
    return platform.system() == "Linux"


def get_platform_commands() -> dict[str, str]:
    """Get platform-specific command equivalents."""
    if is_windows():
        return {
            "list_files": "dir",
            "system_info": "systeminfo",
            "environment": "set",
            "processes": "tasklist",
            "network": "ipconfig",
            "disk_usage": "wmic logicaldisk get size,freespace,caption",
            "clear": "cls",
            "copy": "copy",
            "move": "move",
            "remove": "del",
            "remove_dir": "rmdir /s /q",
            "make_dir": "mkdir",
            "cat": "type",
            "find": "findstr",
            "path_separator": "\\",
            "shell": "cmd.exe"
        }
    else:  # Unix-like (Linux/macOS)
        return {
            "list_files": "ls -la",
            "system_info": "uname -a",
            "environment": "env",
            "processes": "ps aux",
            "network": "ifconfig",
            "disk_usage": "df -h",
            "clear": "clear",
            "copy": "cp",
            "move": "mv",
            "remove": "rm",
            "remove_dir": "rm -rf",
            "make_dir": "mkdir -p",
            "cat": "cat",
            "find": "grep",
            "path_separator": "/",
            "shell": "/bin/sh"
        }


def get_platform_info_text() -> str:
    """Get detailed platform information as formatted text."""
    system = platform.system()
    release = platform.release()
    machine = platform.machine()
    
    info = [
        f"Operating System: {system} {release}",
        f"Architecture: {machine}",
        f"Python Version: {platform.python_version()}",
    ]
    
    if is_windows():
        info.append("Shell: cmd.exe / PowerShell")
        info.append("\nCommon Commands:")
        info.append("  - List files: dir")
        info.append("  - System info: systeminfo")
        info.append("  - View file: type <file>")
        info.append("  - Environment: set")
    else:
        shell = platform.system()
        info.append(f"Shell: {shell}")
        info.append("\nCommon Commands:")
        info.append("  - List files: ls -la")
        info.append("  - System info: uname -a")
        info.append("  - View file: cat <file>")
        info.append("  - Environment: env")
    
    return "\n".join(info)
