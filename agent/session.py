from config.config import Config
from client.llm_client import LLMClient
from context.contextManager import ContextManager
from tools.registry import create_default_registry
from datetime import datetime
import uuid

class Session:
    def __init__(self, config: Config):
        self.config = config
        self.client = LLMClient(
            config = self.config
        )
        self.tool_registry = create_default_registry(self.config)
        self.context_manager = ContextManager(
            config = self.config,
            tools = self.tool_registry.get_tools()
        )
        self.session_id = str(uuid.uuid4())
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.turn_count = 0
    
    def increment_turn_count(self)->int:
        self.turn_count += 1
        self.updated_at = datetime.now()

        return self.turn_count
    
    