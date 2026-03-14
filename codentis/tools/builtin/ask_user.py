from pydantic import BaseModel, Field
from codentis.tools.base import Tool, ToolResult, ToolInvocation, ToolKind


class AskUserParams(BaseModel):
    question: str = Field(
        ...,
        description="The question to ask the user"
    )
    options: list[str] = Field(
        default_factory=list,
        description="Optional list of choices for the user to select from (e.g., ['yes', 'no', 'skip'])"
    )
    allow_freeform: bool = Field(
        default=True,
        description="Whether to allow freeform text input in addition to options"
    )


class AskUserTool(Tool):
    name: str = "ask_user"
    description: str = (
        "Ask the user a question and wait for their response. "
        "Use this when you need clarification, confirmation, or additional information from the user. "
        "You can provide multiple choice options or allow freeform text input."
    )
    kind: ToolKind = ToolKind.SHELL
    schema: type[BaseModel] = AskUserParams

    async def execute(self, invocation: ToolInvocation) -> ToolResult:
        params = AskUserParams(**invocation.params)
        
        # Return a special result that signals the app to prompt the user
        return ToolResult(
            success=True,
            output="",
            metadata={
                "requires_user_input": True,
                "question": params.question,
                "options": params.options,
                "allow_freeform": params.allow_freeform
            }
        )
