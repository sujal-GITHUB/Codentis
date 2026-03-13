from __future__ import annotations
from typing import AsyncGenerator
from codentis.agent.events import AgentEvent, AgentEventType
from codentis.client.response import StreamEvent, StreamEventType, ToolResultMessage
from codentis.config.config import Config
from pathlib import Path
from codentis.agent.session import Session
import json

class Agent:
    def __init__(self, config: Config):
        self.config = config
        self.session: Session | None = None

    async def run(self, message: str)->AsyncGenerator[AgentEvent, None]:
        yield AgentEvent.agent_start(message)
        if not self.session:
            self.session = Session(self.config)
        self.session.context_manager.add_user_message(message)

        final_response: str | None = None

        async for event in self.agentic_loop(message):
            yield event

            if event.type == AgentEventType.TEXT_COMPLETE:
                final_response = event.data.get("content")

        yield AgentEvent.agent_end(final_response)
    
    async def agentic_loop(self, message: str)->AsyncGenerator[AgentEvent, None]:
        max_turns = self.config.max_turns

        for turn in range(max_turns):
            self.session.increment_turn_count()
            response_text = ""        
            tool_schemas = self.session.tool_registry.get_schemas()
            tool_calls: list[ToolCall] = []
        
            async for event in self.session.client.chat_completion(
                self.session.context_manager.get_messages(), 
                tools=tool_schemas if tool_schemas else None, 
                stream=True
            ):
                if event.type == StreamEventType.TEXT_DELTA:
                    if event.text_delta:
                        content = event.text_delta.content
                        response_text += content
                        yield AgentEvent.text_delta(content)
                elif event.type == StreamEventType.TOOL_CALL_COMPLETE:
                    if event.tool_call:
                        tool_calls.append(event.tool_call)
                elif event.type == StreamEventType.MESSAGE_COMPLETE:
                    yield AgentEvent.text_complete(response_text)
                elif event.type == StreamEventType.ERROR:
                    yield AgentEvent.agent_error(event.error or "Unknown error occured.")
            
            self.session.context_manager.add_assistant_message(
                response_text if response_text else "",
                [
                    {
                        'id': tool_call.call_id,
                        'type': 'function',
                        'function': {
                            'name': tool_call.name,
                            'arguments': json.dumps(tool_call.arguments)
                        }
                    }
                    for tool_call in tool_calls
                ]
                if tool_calls else None
            )

            if response_text:
                yield AgentEvent.text_complete(response_text)

            if not tool_calls:
                return

            tool_call_results: list[ToolResultMessage] = []

            for tool_call in tool_calls:
                yield AgentEvent.tool_call_start(
                    tool_call.call_id, 
                    tool_call.name, 
                    tool_call.arguments
                )

                result = await self.session.tool_registry.invoke(
                    tool_call.name,
                    tool_call.arguments,
                    self.config.cwd
                )

                yield AgentEvent.tool_call_complete(
                    tool_call.call_id,
                    tool_call.name,
                    result
                )

                tool_call_results.append(
                    ToolResultMessage(
                        tool_call_id = tool_call.call_id,
                        content = result.to_model_output(),
                        is_error = not result.success
                    )
                )

            for tool_result in tool_call_results:
                self.session.context_manager.add_tool_result(tool_result.tool_call_id, tool_result.content, tool_result.is_error)
    
    async def __aenter__(self)->Agent:
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb)->None:
        if self.session and self.session.client:
            await self.session.client.close()
            self.session = None