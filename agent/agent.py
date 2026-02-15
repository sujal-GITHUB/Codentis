from __future__ import annotations
from typing import AsyncGenerator
from agent.events import AgentEvent, AgentEventType
from client.llm_client import LLMClient
from client.response import StreamEvent, StreamEventType
from context.contextManager import ContextManager

class Agent:
    def __init__(self):
        self.client = LLMClient()
        self.context_manager = ContextManager()

    async def run(self, message: str)->AsyncGenerator[AgentEvent, None]:
        yield AgentEvent.agent_start(message)
        self.context_manager.add_user_message(message)

        final_response: str | None = None

        async for event in self.agentic_loop(message):
            yield event

            if event.type == AgentEventType.TEXT_COMPLETE:
                final_response = event.data.get("content")

        yield AgentEvent.agent_end(final_response)
    
    async def agentic_loop(self, message: str)->AsyncGenerator[AgentEvent, None]:
        response_text = ""        

        async for event in self.client.chat_completion(self.context_manager.get_messages(), stream=True):
            if event.type == StreamEventType.TEXT_DELTA:
                if event.text_delta:
                    content = event.text_delta.content
                    response_text += content
                    yield AgentEvent.text_delta(content)
            elif event.type == StreamEventType.MESSAGE_COMPLETE:
                yield AgentEvent.text_complete(response_text)
            elif event.type == StreamEventType.ERROR:
                yield AgentEvent.agent_error(event.error or "Unknown error occured.")
        
        self.context_manager.add_assistant_message(response_text or None)

        if response_text:
            yield AgentEvent.text_complete(response_text)
    
    async def __aenter__(self)->Agent:
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb)->None:
        if self.client:
            await self.client.close()
            self.client = None