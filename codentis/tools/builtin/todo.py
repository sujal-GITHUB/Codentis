import uuid
from codentis.tools.base import Tool, ToolResult, ToolKind, ToolInvocation
from pydantic import BaseModel, Field
from codentis.utils.paths import resolve_path
from codentis.utils.paths import is_binary_file
from pathlib import Path
from codentis.config.config import Config

class TodoParams(BaseModel):
    action: str = Field(..., description="Action : 'add', 'remove', 'list', 'clear', 'complete")
    id: str = Field(None, description="Task ID (for complete)")
    content: str = Field(None, description="Todo content (for add)")

class TodoTool(Tool):
    name = "todo"
    description = "Manage a task list for the current project. Supports adding, removing, and listing tasks. Use this to track your progress on the project."
    kind = ToolKind.MEMORY
    schema = TodoParams

    def __init__(self, config: Config):
        super().__init__(config)
        self.todos: dict[str, str] = {}
        self.completed: dict[str, str] = {}  # Track completed tasks
    
    async def execute(self, invocation: ToolInvocation) -> ToolResult:
        params = TodoParams(**invocation.params)

        if params.action == "add":
            if not params.content:
                return ToolResult.error_result("`content` is required for `add` action")

            todo_id = str(uuid.uuid4())[:8]
            self.todos[todo_id] = params.content
            return ToolResult.success_result(
                f"✓ Adding task: {params.content}",
                metadata={"action": "add", "id": todo_id, "content": params.content}
            )

        elif params.action == "complete":
            if not params.id:
                return ToolResult.error_result("`id` is required for `complete` action")
            if params.id not in self.todos:
                return ToolResult.error_result(f"Todo with ID: {params.id} not found")

            content = self.todos.pop(params.id)
            self.completed[params.id] = content  # Move to completed
            return ToolResult.success_result(
                f"☑ Completed: {content}",
                metadata={"action": "complete", "id": params.id, "content": content}
            )
        
        elif params.action == "list":
            if not self.todos and not self.completed:
                return ToolResult.success_result("No tasks found", metadata={"action": "list", "count": 0})
            
            lines = ['Task List:']
            # Show completed tasks first
            for todo_id, content in self.completed.items():
                lines.append(f"☑ {content} (ID: {todo_id})")
            # Then show pending tasks
            for todo_id, content in self.todos.items():
                lines.append(f"☐ {content} (ID: {todo_id})")
            
            total_count = len(self.todos) + len(self.completed)
            return ToolResult.success_result("\n".join(lines), metadata={"action": "list", "count": total_count, "show_complete_list": True})
        
        elif params.action == "clear":
            count = len(self.todos) + len(self.completed)
            self.todos.clear()
            self.completed.clear()
            return ToolResult.success_result(f"{count} todos cleared", metadata={"action": "clear", "count": count})
        
        else:
            return ToolResult.error_result(f"Invalid action: {params.action}")