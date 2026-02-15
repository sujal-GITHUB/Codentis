from prompts.system import get_system_prompt
from utils.text import count_tokens
from dataclasses import dataclass
from typing import Any
from config.config import Config

@dataclass
class MessageItem:
    role: str
    content: str
    token_count: int | None = None

    def to_dict(self)->dict[str, Any]:
        result: dict[str, Any] = {'role': self.role}
        
        if self.content:
            result['content'] = self.content

        return result 

class ContextManager:
    def __init__(self)->None:
        self.config = Config()
        self.system_prompt = get_system_prompt(self.config)
        self.messages: list[MessageItem] = []
        self.model_name = "arcee-ai/trinity-large-preview:free"
    
    def add_user_message(self, content: str)->None:
        item = MessageItem(
            role="user",
            content=content,
            token_count=count_tokens(content, self.model_name),
        )

        self.messages.append(item)
        return item
    
    def add_assistant_message(self, content: str)->None:
        item = MessageItem(
            role="assistant",
            content=content or "",
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