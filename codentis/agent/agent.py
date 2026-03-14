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
        recent_tool_calls = []  # Track recent tool calls to detect loops

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
            
            # Check for repeated FAILED tool calls (potential infinite loop)
            # Only track if at least one tool failed
            if any(not r.is_error for r in tool_call_results):
                # At least one tool succeeded, reset the failure tracking
                recent_tool_calls = []
            else:
                # All tools failed, track for loop detection
                tool_call_signature = [(tc.name, json.dumps(tc.arguments, sort_keys=True)) for tc in tool_calls]
                recent_tool_calls.append(tool_call_signature)
                
                # Keep only last 5 turns for better detection
                if len(recent_tool_calls) > 5:
                    recent_tool_calls.pop(0)
                
                # Check for exact repetition (3 identical calls)
                exact_loop = len(recent_tool_calls) >= 3 and recent_tool_calls[-1] == recent_tool_calls[-2] == recent_tool_calls[-3]
                
                # Check for similar repetition (same tool failing repeatedly)
                similar_loop = False
                if len(recent_tool_calls) >= 5:
                    # Check if the same tool is being called repeatedly (even with different args)
                    tool_names = [tc[0][0] if tc else None for tc in recent_tool_calls[-5:]]
                    if len(set(tool_names)) == 1 and tool_names[0]:  # All same tool
                        similar_loop = True
                
                if exact_loop or similar_loop:
                    # Instead of erroring, inject an ask_user tool call to get clarification
                    from codentis.tools.builtin.ask_user import AskUserTool
                    
                    ask_user_tool = AskUserTool(config=self.config)
                    
                    # Create a synthetic tool call for asking the user
                    question = "I seem to be stuck trying the same approach repeatedly. The previous attempts failed. Would you like me to:"
                    options = [
                        "Try a different approach",
                        "Get more information about the error",
                        "Stop and let me handle it manually",
                        "Continue trying (not recommended)"
                    ]
                    
                    yield AgentEvent.tool_call_start(
                        "loop_detection_ask",
                        "ask_user",
                        {
                            "question": question,
                            "options": options,
                            "allow_freeform": True
                        }
                    )
                    
                    # Execute the ask_user tool
                    from codentis.tools.base import ToolInvocation
                    invocation = ToolInvocation(
                        params={
                            "question": question,
                            "options": options,
                            "allow_freeform": True
                        },
                        cwd=self.config.cwd
                    )
                    
                    result = await ask_user_tool.execute(invocation)
                    
                    yield AgentEvent.tool_call_complete(
                        "loop_detection_ask",
                        "ask_user",
                        result
                    )
                    
                    # Add the user's response to context
                    user_response = result.output
                    self.session.context_manager.add_tool_result(
                        "loop_detection_ask",
                        user_response,
                        False
                    )
                    
                    # Reset the loop detection
                    recent_tool_calls = []
                    
                    # If user wants to stop, return immediately
                    if "stop" in user_response.lower() or "manual" in user_response.lower() or "3" in user_response:
                        # Add a clear message to the context
                        self.session.context_manager.add_assistant_message(
                            "Understood. I'll stop here so you can handle this manually.",
                            None
                        )
                        yield AgentEvent.text_complete(
                            "Understood. I'll stop here so you can handle this manually."
                        )
                        return
                    
                    # Otherwise continue with the user's guidance
                    continue

            for tool_result in tool_call_results:
                self.session.context_manager.add_tool_result(tool_result.tool_call_id, tool_result.content, tool_result.is_error)
    
    async def __aenter__(self)->Agent:
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb)->None:
        if self.session and self.session.client:
            await self.session.client.close()
            self.session = None