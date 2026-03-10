import asyncio
import sys
from pydantic import BaseModel, Field
from tools.base import Tool, ToolResult, ToolInvocation, ToolKind


class ShellParams(BaseModel):
    command: str = Field(
        ...,
        description="The shell command to execute (e.g. 'echo hello', 'ls -la', 'python script.py')"
    )
    timeout: int = Field(
        30,
        ge=1,
        le=300,
        description="Maximum number of seconds to wait for the command to complete (default: 30, max: 300)"
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
        cwd = invocation.cwd

        # On Windows use cmd /c, on Unix use sh -c
        if sys.platform == "win32":
            args = ["cmd", "/c", params.command]
        else:
            args = ["sh", "-c", params.command]

        try:
            proc = await asyncio.create_subprocess_exec(
                *args,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                cwd=str(cwd),
            )

            try:
                stdout_bytes, stderr_bytes = await asyncio.wait_for(
                    proc.communicate(), timeout=params.timeout
                )
            except asyncio.TimeoutError:
                proc.kill()
                await proc.communicate()
                return ToolResult.error_result(
                    f"Command timed out after {params.timeout}s: {params.command}"
                )

            stdout = stdout_bytes.decode("utf-8", errors="replace").rstrip()
            stderr = stderr_bytes.decode("utf-8", errors="replace").rstrip()
            returncode = proc.returncode

            output_parts = []
            if stdout:
                output_parts.append(stdout)
            if stderr:
                output_parts.append(f"[stderr]\n{stderr}")
            output = "\n".join(output_parts) if output_parts else "(no output)"

            if returncode == 0:
                return ToolResult.success_result(
                    output,
                    metadata={
                        "command": params.command,
                        "returncode": returncode,
                        "cwd": str(cwd),
                    }
                )
            else:
                return ToolResult.error_result(
                    f"Command exited with code {returncode}",
                    output=output,
                    metadata={
                        "command": params.command,
                        "returncode": returncode,
                        "cwd": str(cwd),
                    }
                )

        except FileNotFoundError:
            return ToolResult.error_result(
                f"Shell executable not found. Cannot run: {params.command}"
            )
        except Exception as e:
            return ToolResult.error_result(f"Unexpected error running command: {e}")
