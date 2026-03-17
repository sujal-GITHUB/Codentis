import uuid
import json
from codentis.tools.base import Tool, ToolResult, ToolKind, ToolInvocation
from pydantic import BaseModel, Field
from pathlib import Path
from codentis.config.config import Config
from codentis.config.loader import get_data_dir

class TodoParams(BaseModel):
    action: str = Field(..., description="Action : 'add', 'remove', 'list', 'clear', 'complete'")
    id: str = Field(None, description="Task ID (for complete or remove)")
    content: str = Field(None, description="Todo content (for add)")

class TodoTool(Tool):
    name = "todo"
    description = "Manage a task list for the current project. Supports adding, removing, and listing tasks. Use this to track your progress on the project."
    kind = ToolKind.MEMORY
    schema = TodoParams

    def __init__(self, config: Config):
        super().__init__(config)
    
    def _get_todo_path(self) -> Path:
        data_dir = get_data_dir()
        data_dir.mkdir(parents=True, exist_ok=True)
        return data_dir / "todos.json"

    def load_todos(self) -> dict:
        path = self._get_todo_path()
        if not path.exists():
            return {'todos': {}, 'completed': {}}
        
        try:
            content = path.read_text(encoding="utf-8")
            return json.loads(content)
        except Exception:
            return {'todos': {}, 'completed': {}}
    
    def save_todos(self, data: dict):
        path = self._get_todo_path()
        path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    
    async def execute(self, invocation: ToolInvocation) -> ToolResult:
        params = TodoParams(**invocation.params)
        data = self.load_todos()
        todos = data.get('todos', {})
        completed = data.get('completed', {})

        if params.action == "add":
            if not params.content:
                return ToolResult.error_result("`content` is required for `add` action")

            todo_id = str(uuid.uuid4())[:8]
            todos[todo_id] = params.content
            data['todos'] = todos
            self.save_todos(data)
            return ToolResult.success_result(
                f"✓ Adding task: {params.content}",
                metadata={"action": "add", "id": todo_id, "content": params.content}
            )

        elif params.action == "complete":
            if not params.id:
                return ToolResult.error_result("`id` is required for `complete` action")
            if params.id not in todos:
                return ToolResult.error_result(f"Todo with ID: {params.id} not found")

            content = todos.pop(params.id)
            completed[params.id] = content
            data['todos'] = todos
            data['completed'] = completed
            self.save_todos(data)
            return ToolResult.success_result(
                f"☑ Completed: {content}",
                metadata={"action": "complete", "id": params.id, "content": content}
            )
        
        elif params.action == "remove":
            if not params.id:
                return ToolResult.error_result("`id` is required for `remove` action")
            
            removed_content = None
            if params.id in todos:
                removed_content = todos.pop(params.id)
            elif params.id in completed:
                removed_content = completed.pop(params.id)
            else:
                return ToolResult.error_result(f"Todo with ID: {params.id} not found")

            data['todos'] = todos
            data['completed'] = completed
            self.save_todos(data)
            return ToolResult.success_result(
                f"🗑 Removed task: {removed_content}",
                metadata={"action": "remove", "id": params.id, "content": removed_content}
            )
        
        elif params.action == "list":
            if not todos and not completed:
                return ToolResult.success_result("No tasks found", metadata={"action": "list", "count": 0})
            
            lines = ['Task List:']
            for todo_id, content in completed.items():
                lines.append(f"☑ {content} (ID: {todo_id})")
            for todo_id, content in todos.items():
                lines.append(f"☐ {content} (ID: {todo_id})")
            
            total_count = len(todos) + len(completed)
            return ToolResult.success_result("\n".join(lines), metadata={"action": "list", "count": total_count, "show_complete_list": True})
        
        elif params.action == "clear":
            count = len(todos) + len(completed)
            data['todos'] = {}
            data['completed'] = {}
            self.save_todos(data)
            return ToolResult.success_result(f"{count} todos cleared", metadata={"action": "clear", "count": count})
        
        else:
            return ToolResult.error_result(f"Invalid action: {params.action}")