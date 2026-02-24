from prompts.system import get_system_prompt
from utils.text import count_tokens
from dataclasses import dataclass, field
from typing import Any
from config.config import Config

@dataclass
class MessageItem:
    role: str
    content: str
    token_count: int | None = None
    tool_call_id: str | None = None
    tool_calls: list[dict[str, Any]] = field(default_factory=list)

    def to_dict(self)->dict[str, Any]:
        result: dict[str, Any] = {'role': self.role}

        if self.tool_call_id:
            result['tool_call_id'] = self.tool_call_id
        
        if self.tool_calls:
            result['tool_calls'] = self.tool_calls
        
        if self.content:
            result['content'] = self.content

        return result 

class ContextManager:
    def __init__(self)->None:
        self.config = Config()
        self.system_prompt = get_system_prompt(self.config)
        self.messages: list[MessageItem] = []
        self.model_name = self.config.model_name
    
    def add_user_message(self, content: str)->None:
        item = MessageItem(
            role="user",
            content=content,
            token_count=count_tokens(content, self.model_name),
        )

        self.messages.append(item)
        return item
    
    def add_assistant_message(self, content: str, tool_calls: list[dict[str, Any]] | None = None)->None:
        item = MessageItem(
            role="assistant",
            content=content or "",
            token_count=count_tokens(content or "", self.model_name),
            tool_calls=tool_calls or [],
        )
        self.messages.append(item)
        return item
    
    def add_tool_result(self, tool_call_id: str, content: str, is_error: bool)->None:
        item = MessageItem(
            role="tool",
            content=content,
            token_count=count_tokens(content, self.model_name),
        )

        self.messages.append(item)
        return item

    def get_messages(self)->list[MessageItem]:
        messages = []
        
        if self.system_prompt:
            messages.append({
                "role": "system",
                "content": self.system_prompt,
            })
        
        for item in self.messages:
            messages.append(item.to_dict())
        
        return messages