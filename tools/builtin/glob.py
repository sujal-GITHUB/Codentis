from tools.base import Tool, ToolResult, ToolKind, ToolInvocation
from pydantic import BaseModel, Field
from utils.paths import resolve_path
import re
import os
import sys
from utils.paths import is_binary_file
from pathlib import Path

class GlobParams(BaseModel):
    pattern: str = Field(..., description="The glob pattern to match. (e.g **/*.py)")
    path: str = Field('.', description="The path to the directory to search in. Defaults to current directory.")

class GlobTool(Tool):
    name = "glob"
    description = "Find files by glob pattern. Supports ** for recursive search."
    kind = ToolKind.READ
    schema = GlobParams
    
    async def execute(self, invocation: ToolInvocation) -> ToolResult:
        params = GlobParams(**invocation.params)
        search_path = resolve_path(invocation.cwd, params.path)

        if not search_path.exists():
            return ToolResult.error_result(f"Directory not found: {search_path}")

        try:
            import fnmatch
            matched_files_list = []
            EXCLUDED_DIRS = {"node_modules", "venv", ".venv", "build", "dist", "__pycache__", "target", ".git", ".vscode", ".idea", "out"}
            
            pattern = params.pattern
            
            for root, dirs, filenames in os.walk(search_path):
                dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRS]
                
                for filename in filenames:
                    file_path = Path(root) / filename
                    rel_path = file_path.relative_to(search_path)
                    
                    # Match against pattern
                    if fnmatch.fnmatch(str(rel_path).replace("\\", "/"), pattern.replace("\\", "/")):
                        matched_files_list.append(file_path)

        except Exception as e:
            return ToolResult.error_result(f"Error globbing pattern: {e}")

        output_lines = []
        for file_path in matched_files_list[:1000]:
            try:
                rel_path = file_path.relative_to(invocation.cwd)       
            except Exception:
                rel_path = file_path
            
            output_lines.append(str(rel_path))
        
        if len(matched_files_list) > 1000:
            output_lines.append(f"... {len(matched_files_list) - 1000} more matches not shown...")
            
        return ToolResult.success_result("\n".join(output_lines),
        metadata={
            "path": str(search_path),
            "matches": len(matched_files_list),
            "files_searched": len(matched_files_list)
        })
    
    def find_files(self,search_path: Path) -> list[Path]:
        files = []
        for root, dirs, filenames in os.walk(search_path):
            dirs[:] = [d for d in dirs if d not in {"node_modules", "venv", "build", "dist", "__pycache__", "target", ".git", ".vscode", ".idea", "out"}]
            for filename in filenames:
                if filename.startswith('.'):
                    continue

                file_path = Path(root) / filename

                if not is_binary_file(file_path):
                    files.append(file_path)
                    if len(files) >= 500:
                        return files
        return files
