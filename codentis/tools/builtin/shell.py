import asyncio
import sys
import os
import signal
import fnmatch
from pathlib import Path
from pydantic import BaseModel, Field
from codentis.tools.base import Tool, ToolResult, ToolInvocation, ToolKind

BLOCKED_COMMANDS = {
    "rm -rf /", "rm -rf", "sudo", "su", "shutdown", "reboot",
    "halt", "poweroff", "mkfs", "dd", "passwd", "chown", "chmod",
    "nano", "vim", "vi", "emacs", "less", "more", "top", "htop",
    "ssh", "ftp", "telnet", "mysql", "psql", "sqlite3", "redis-cli",
    "init", "init 0", "init 6", ":(){", "chmod 777", "chmod 7777",
    "chmod -R 777", "chmod -R 7777", "halt", "poweroff",
    "codentis config --reset", "codentis config", "codentis trust",
    "codentis doctor", "codentis version", "codentis"
}

# Commands that modify the filesystem or system state
WRITE_COMMANDS = {
    # File operations
    "rm", "del", "rmdir", "mv", "move", "cp", "copy", "touch", "mkdir",
    "echo", "cat", "type", "write", "tee",
    # Package managers
    "npm", "yarn", "pnpm", "pip", "pip3", "apt", "apt-get", "yum", "dnf",
    "brew", "cargo", "gem", "composer", "go",
    # Build tools
    "make", "cmake", "gradle", "mvn", "ant",
    # Git operations
    "git",
    # Archive operations
    "tar", "zip", "unzip", "gzip", "gunzip",
    # Download operations
    "curl", "wget", "download",
}

def is_write_command(command: str) -> tuple[bool, str]:
    """
    Check if a command performs write operations.
    Returns (is_write, reason)
    """
    cmd_lower = command.strip().lower()
    cmd_parts = cmd_lower.split()
    
    if not cmd_parts:
        return False, ""
    
    base_cmd = cmd_parts[0]
    
    # Check if it's a write command
    if base_cmd in WRITE_COMMANDS:
        # Special cases where we can determine it's read-only
        if base_cmd == "git" and len(cmd_parts) > 1:
            git_subcmd = cmd_parts[1]
            read_only_git = {"status", "log", "diff", "show", "branch", "remote", "config"}
            if git_subcmd in read_only_git:
                return False, ""
        
        if base_cmd == "npm" and len(cmd_parts) > 1:
            npm_subcmd = cmd_parts[1]
            read_only_npm = {"list", "ls", "view", "show", "search", "outdated"}
            if npm_subcmd in read_only_npm:
                return False, ""
        
        # Check for output redirection (>, >>)
        if ">" in command:
            return True, "writes to file via redirection"
        
        return True, f"executes '{base_cmd}' which can modify files/system"
    
    # Check for output redirection even with read commands
    if ">" in command or ">>" in command:
        return True, "writes to file via redirection"
    
    return False, ""

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
    skip_permission_check: bool = Field(
        False,
        description="Internal flag to skip permission check (set automatically after user approval)"
    )


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
        
        # Block Codentis CLI commands
        if cmd_parts and cmd_parts[0] == "codentis":
            return ToolResult.error_result(
                f"Codentis CLI commands cannot be executed via shell tool. "
                f"These commands are handled by the application itself. "
                f"If you need to run '{params.command}', tell the user to run it in their terminal.",
                metadata={'blocked': True, 'reason': 'codentis_cli_command'}
            )
        
        # Block other dangerous commands
        if cmd_parts:
            base_cmd = cmd_parts[0]
            if base_cmd in BLOCKED_COMMANDS or any(b in cmd_lower for b in BLOCKED_COMMANDS if ' ' in b):
                return ToolResult.error_result(
                    f"Command '{base_cmd}' is blocked for safety and cannot be executed.",
                    metadata = {'blocked': True}
                )
        
        # Check if command requires permission (skip if already approved)
        if not params.skip_permission_check:
            is_write, reason = is_write_command(params.command)
            if is_write:
                # Use ask_user tool to get permission instead of returning error
                return ToolResult(
                    success=False,
                    output="",
                    error=f"This command {reason} and requires your approval.",
                    metadata={
                        'requires_user_input': True,
                        'question': f"This command will {reason}:\n\n`{params.command}`\n\nDo you want to proceed?",
                        'options': ["Yes, execute it", "No, cancel"],
                        'allow_freeform': False,
                        'permission_request': True,
                        'command': params.command
                    }
                )

        if params.cwd:
            cwd = Path(params.cwd)
            if not cwd.is_absolute():
                cwd = invocation.cwd/cwd
        else:
            cwd = invocation.cwd

        if not cwd.exists():
            return ToolResult.error_result(
                f"Working directory doesn't exist: {cwd}"
            )

        env = self.build_environment()
        
        # Use platform from config instead of sys.platform
        platform_name = self.config.shell_environment.platform
        if platform_name == "Windows":
            # On Windows, wrap the command in quotes to handle paths with spaces correctly
            # This prevents issues with commands like: dir "C:\Program Files"
            shell_command = ["cmd.exe", "/c", f'"{params.command}"']
        else:
            shell_command = ["/bin/sh", "-c", params.command]

        try:
            process = await asyncio.create_subprocess_exec(
                *shell_command,
                stdout = asyncio.subprocess.PIPE,
                stderr= asyncio.subprocess.PIPE,
                cwd=str(cwd),
                env=env,
                start_new_session=True,
            )

            try: 
                stdout_data, stderr_data = await asyncio.wait_for(
                    process.communicate(),
                    timeout=params.timeout
                )
            except asyncio.TimeoutError:
                platform_name = self.config.shell_environment.platform
                if platform_name != "Windows":
                    os.killpg(os.getpgid(process.pid), signal.SIGKILL)
                else:
                    process.kill()
                await process.wait()
                return ToolResult.error_result(
                    f"Command timed out after {params.timeout} seconds",
                    metadata={
                        "timeout": params.timeout
                    }
                )

            stdout_str = stdout_data.decode("utf-8", errors="replace").strip()
            stderr_str = stderr_data.decode("utf-8", errors="replace").strip()

            exit_code = process.returncode
            output = ""
            if stdout_str:
                output += stdout_str.rstrip()
            if stderr_str:
                output += f"\n --- stderr ---\n"
                output += stderr_str.rstrip()

            if exit_code != 0:
                output += f"\n --- exit code ---\n"
                output += str(exit_code)
            
            if len(output) > 100*1024:
                output = output[:100*1024] + "\n... (output truncated)"
 
            return ToolResult(
                success=exit_code == 0,
                output=output,
                error=stderr_str if exit_code != 0 else None,
                exit_code=exit_code
            )
        except Exception as e:
            return ToolResult.error_result(
                f"An unexpected error occurred: {e}",
                metadata={"error_type": type(e).__name__}
            )

    def build_environment(self) -> dict[str, str]:
        env = os.environ.copy()
        shell_environment = self.config.shell_environment # Fixed typo

        if shell_environment.ignore_default_excludes:
            env.update(shell_environment.set_vars)
        else:
            for pattern in shell_environment.exclude_patterns:
                keys_to_remove = [k for k in env.keys() if fnmatch.fnmatch(k.upper(), pattern.upper())]
                for k in keys_to_remove:
                    del env[k]
            env.update(shell_environment.set_vars)
        return env