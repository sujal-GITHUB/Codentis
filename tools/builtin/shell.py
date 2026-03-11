import asyncio
import sys
from pydantic import BaseModel, Field
from tools.base import Tool, ToolResult, ToolInvocation, ToolKind, is_a

BLOCKED_COMMANDS = {
    "rm -rf /", "rm -rf", "sudo", "su", "shutdown", "reboot",
    "halt", "poweroff", "mkfs", "dd", "passwd", "chown", "chmod",
    "nano", "vim", "vi", "emacs", "less", "more", "top", "htop",
    "ssh", "ftp", "telnet", "mysql", "psql", "sqlite3", "redis-cli",
    "init", "init 0", "init 6", ":(){", "chmod 777", "chmod 7777",
    "chmod -R 777", "chmod -R 7777", "halt", "poweroff"
}

class ShellParams(BaseModel):
    command: str = Field(
        ...,
        description="The shell command to execute (e.g. 'dir', 'python script.py')"
    )
    timeout: int = Field(
        120,
        ge=1,
        le=600,
        description="Maximum number of seconds to wait for the command to complete (default: 30, max: 300)"
    )
    cwd: str | None = Field(None, description='Working directory for the command')


class ShellTool(Tool):
    name: str = "shell"
    description: str = (
        "Execute a shell command in the current working directory and return its output. "
        "Use this to run scripts, create files via CLI tools, install packages, run tests, "
        "or perform any OS-level operation. Stdout and stderr are both captured."
    )
    kind: ToolKind = ToolKind.SHELL
    schema: type[BaseModel] = ShellParams

    async def execute(self, invocation: ToolInvocation) -> ToolResult:
        params = ShellParams(**invocation.params)

        cmd_lower = params.command.strip().lower()
        cmd_parts = cmd_lower.split()
        if cmd_parts:
            base_cmd = cmd_parts[0]
            if base_cmd in BLOCKED_COMMANDS or any(b in cmd_lower for b in BLOCKED_COMMANDS if ' ' in b):
                return ToolResult.error_result(
                    f"Command '{base_cmd}' is blocked for safety and cannot be executed.",
                    metadata = {'blocked': True}
                )

        if params.cwd:
            cwd = Path(params.cwd)
            if not cwd.is_a
