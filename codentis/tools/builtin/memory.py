import uuid
import json
from codentis.tools.base import Tool, ToolResult, ToolKind, ToolInvocation
from pydantic import BaseModel, Field
from pathlib import Path
from codentis.config.config import Config
from codentis.config.loader import get_data_dir

class MemoryParams(BaseModel):
    action: str = Field(..., description="Action to perform: 'set', 'get', 'list', 'delete' or 'clear'")
    key: str | None = Field(None, description="Memory key (required for 'get', 'set', 'clear')")
    value: str | None = Field(None, description="Value for the memory entry (required for 'set')")

class MemoryTool(Tool):
    name = "memory"
    description = "ACTUAL persistent memory storage. You MUST use this tool to store any information you promise to remember (names, preferences, project context). Verbal promises are NOT persistent; ONLY values stored via this tool will survive across sessions."
    kind = ToolKind.MEMORY
    schema = MemoryParams

    def _get_memory_path(self) -> Path:
        data_dir = get_data_dir()
        data_dir.mkdir(parents=True, exist_ok=True)
        return data_dir / "memory.json"

    def load_memory(self) -> dict:
        path = self._get_memory_path()
        if not path.exists():
            return {'entries': {}}
        
        try:
            content = path.read_text(encoding="utf-8")
            return json.loads(content)
        except Exception:
            return {'entries': {}}
    
    def save_memory(self, memory: dict):
        path = self._get_memory_path()
        path.write_text(json.dumps(memory, indent=2, ensure_ascii=False), encoding="utf-8")
    
    async def execute(self, invocation: ToolInvocation) -> ToolResult:
        params = MemoryParams(**invocation.params)
        memory = self.load_memory()
        entries = memory.get('entries', {})

        action = params.action.lower()
        if action == "set":
            if not params.key or params.value is None:
                return ToolResult.error_result("Key and value are required for 'set' action")
            
            entries[params.key] = params.value
            memory['entries'] = entries
            self.save_memory(memory)
            return ToolResult.success_result(
                f"Memory entry '{params.key}' set to '{params.value}'",
                metadata={"action": "set", "key": params.key, "value": params.value}
            )
        
        elif action == "get":
            if not params.key:
                return ToolResult.error_result("Key is required for 'get' action")
            
            if params.key not in entries:
                return ToolResult.error_result(f"Memory not found : {params.key}")
            
            return ToolResult.success_result(
                f"Memory found : {params.key} : {entries[params.key]}",
                metadata={"action": "get", "key": params.key, "value": entries[params.key]}
            )
        
        elif action == "list":
            memory = self.load_memory()
            entries = memory.get('entries', {})

            if not entries:
                return ToolResult.success_result("Memory is empty")
            
            lines = ["Memory Entries:"]
            for k, v in entries.items():
                lines.append(f"{k}: {v}")
            return ToolResult.success_result(
                "\n".join(lines),
                metadata={"action": "list", "count": len(entries)}
            )

        elif action == "clear":
            memory = self.load_memory()
            count = len(memory.get('entries', {}))
            memory['entries'] = {}
            self.save_memory(memory)
            return ToolResult.success_result(
                f"All memory cleared : {count} entries",
                metadata={"action": "clear", "count": count}
            )
        
        elif action == "delete":
            if not params.key:
                return ToolResult.error_result("Key is required for 'delete' action")
            
            if params.key not in memory.get('entries', {}):
                return ToolResult.error_result(f"Memory not found : {params.key}")
            
            del memory['entries'][params.key]
            self.save_memory(memory)
            return ToolResult.success_result(
                f"Memory deleted : {params.key}",
                metadata={"action": "delete", "key": params.key}
            )
        
        else:
            return ToolResult.error_result(f"Invalid action: {params.action}")
