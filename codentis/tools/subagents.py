from config.config import Config
from tools.base import Tool, ToolInvocation, ToolResult
from typing import Any
from pydantic import BaseModel, Field
from agents.agent import Agent

class SubAgentDefinition:
    name: str
    description: str
    goal_prompt: str
    all_tools: list[Tool]
    max_turns: int = 20
    timeout_seconds: float = 600

class SubAgentParams(BaseModel):
    goal: str = Field(..., description="Goal to be achieved by the subagent")

class SubAgentTool(Tool):
    def __init__(self, config: Config, definition: SubAgentDefinition)->None:
        super().__init__(definition.name, definition.description)
        self.config = config
        self.definition = definition
    
    @property
    def name(self)->str:
        return f"subagent_{self.definition.name}"
    
    @property
    def description(self)->str:
        return f"subagent_{self.definition.description}"

    schema = SubAgentParams

    def is_mutating(self, params: dict[str, Any]) -> bool:
        return True

    async def execute(self, invocation: ToolInvocation)->ToolResult:
        params = SubAgentParams(**invocation.params)
        if not params.goal:
            return ToolResult.error_result("Goal is required for subagent execution")
        
        try:
            async with Agent
        except Exception as e:
            return ToolResult.error_result(f"Subagent execution failed: {str(e)}")
    
    