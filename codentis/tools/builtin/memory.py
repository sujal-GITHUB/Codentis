import uuid
import json
from codentis.tools.base import Tool, ToolResult, ToolKind, ToolInvocation
from pydantic import BaseModel, Field
from pathlib import Path
from codentis.config.config import Config
from codentis.config.loader import get_data_dir

class MemoryParams(BaseModel):
    action: str = Field(..., description="Action to perform: 'set', 'get', 'list', or 'clear'")
    key: str | None = Field(None, description="Memory key (required for 'get', 'set', 'clear')")
    value: str | None = Field(None, description="Value for the memory entry (required for 'set')")

class MemoryTool(Tool):
    name = "memory"
    description = "Store and retrieve persistent memory. Use this to remember important context, user preferences, and other information that you need to recall later."
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
            return ToolResult.success_result(f"Memory entry '{params.key}' set to '{params.value}'")
        
        elif action == "get":
            if not params.key:
                return ToolResult.error_result("Key is required for 'get' action")
            
            value = entries.get(params.key)
            if value is None:
                return ToolResult.error_result(f"Memory entry '{params.key}' not found")
            
            return ToolResult.success_result(str(value)) # Ensure string output
        
        elif action == "list":
            if not entries:
                return ToolResult.success_result("Memory is empty")
            
            lines = ["Memory Entries:"]
            for k, v in entries.items():
                lines.append(f"{k}: {v}")
            return ToolResult.success_result("\n".join(lines))
        
        elif action == "clear":
            count = len(entries)
            memory['entries'] = {}
            self.save_memory(memory)
            return ToolResult.success_result(f"Cleared {count} memory entries")
        
        else:
            return ToolResult.error_result(f"Invalid action: {params.action}")
