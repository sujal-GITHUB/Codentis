from openai import AsyncOpenAI
from dotenv import load_dotenv
from typing import AsyncGenerator, Any
from client.response import StreamEvent, TextDelta, TokenUsage, StreamEventType, ToolCall, ToolCallDelta, parse_tool_call_arguements
from openai import RateLimitError, APIConnectionError, APIError
import asyncio
import os

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_BASE_URL = os.getenv("OPENAI_BASE_URL")
MODEL_NAME = os.getenv("MODEL_NAME")

class LLMClient:
    def __init__(self)->None:
        self.client : AsyncOpenAI | None = None
        self.max_attempts = 3
        pass

    def get_client(self)->AsyncOpenAI:
        if self.client is None:
            self.client = AsyncOpenAI(
                api_key=OPENAI_API_KEY,
                base_url=OPENAI_BASE_URL
            )
        return self.client

    async def close(self)->None:
        if self.client is not None:
            await self.client.close()
            self.client = None
        pass

    def build_tools(self, tools: list[dict[str, Any]])->list[dict[str, Any]]:
        return [
            {
                "type": "function",
                "function": {
                    "name": tool["name"],
                    "description": tool.get('description', ""),
                    "parameters": tool.get('parameters', {'type': 'object', 'properties': {}}),
                }
            }
            for tool in tools
        ]

    async def chat_completion(self, messages: list[dict[str, Any]], tools: list[dict[str, Any]] | None = None, stream: bool = True)->AsyncGenerator[StreamEvent, None]:
        client = self.get_client()
        kwargs = {
                "model": MODEL_NAME,
                "messages": messages,
                "stream": stream,
            }
        
        if tools: 
            kwargs["tools"] = self.build_tools(tools)
            kwargs["tool_choice"] = "auto"
        
        for attempt in range(self.max_attempts+1):
            try:
                if stream:
                    async for event in self.stream_response(client, kwargs):
                        yield event
                else:
                    event = await self.non_stream_response(client, kwargs)
                    yield event
                pass
            except RateLimitError as e:
                if attempt < self.max_attempts:
                    wait_time = 2 ** attempt
                    await asyncio.sleep(wait_time)
                else:
                    yield StreamEvent(
                        type=StreamEventType.ERROR,
                        error=f"Rate limit exceeded: {e}",
                    )
                    return
            except APIConnectionError as e:
                if attempt < self.max_attempts:
                    wait_time = 2 ** attempt
                    await asyncio.sleep(wait_time)
                else:
                    yield StreamEvent(
                        type=StreamEventType.ERROR,
                        error=f"Connection error: {e}",
                    )
                    return
            except APIError as e:
                yield StreamEvent(
                    type=StreamEventType.ERROR,
                    error=f"API error: {e}",
                )
                return
            except Exception as e:
                yield StreamEvent(
                    type=StreamEventType.ERROR,
                    error=str(e),
                )
            finally:
                await self.close()
            pass
        pass

    async def stream_response(self, client: AsyncOpenAI, kwargs: dict[str, Any])->AsyncGenerator[StreamEvent, None]:
        response = await client.chat.completions.create(**kwargs)

        usage: TokenUsage | None = None
        finish_reason : str | None = None
        tool_calls: dict[int, dict[str, Any]] = {}

        async for chunk in response:
            if hasattr(chunk, "usage") and chunk.usage:
                usage = TokenUsage(
                    prompt_tokens=chunk.usage.prompt_tokens,
                    completion_tokens=chunk.usage.completion_tokens,
                    total_tokens=chunk.usage.total_tokens,
                    cached_tokens=chunk.usage.prompt_tokens_details.cached_tokens,
                )

            if not chunk.choices:
                continue

            choice = chunk.choices[0]
            delta = choice.delta

            if choice.finish_reason:
                finish_reason = choice.finish_reason
            
            if delta.content:
                yield StreamEvent(
                    type=StreamEventType.TEXT_DELTA,
                    text_delta=TextDelta(content=delta.content),
                )

            if delta.tool_calls:
                for tool_call_delta in delta.tool_calls:
                    idx = tool_call_delta.index
                    if idx not in tool_calls:
                        tool_calls[idx] = {
                            'id' : tool_call_delta.id or "",
                            'name' : "",
                            'arguments' : "",
                        }

                    if tool_call_delta.function:
                        if tool_call_delta.function.name:
                            tool_calls[idx]['name'] = tool_call_delta.function.name
                            yield StreamEvent(
                                type=StreamEventType.TOOL_CALL_START,
                                tool_call_delta=ToolCallDelta(
                                    call_id=tool_calls[idx]['id'],
                                    name=tool_calls[idx]['name'],
                                ),
                            )
                        
                        if tool_call_delta.function.arguments:
                            tool_calls[idx]['arguments'] += tool_call_delta.function.arguments
                            yield StreamEvent(
                                type=StreamEventType.TOOL_CALL_DELTA,
                                tool_call_delta=ToolCallDelta(
                                    call_id=tool_calls[idx]['id'],
                                    name=tool_calls[idx]['name'],
                                    arguments=tool_calls[idx]['arguments'],
                                ),
                            )

        for idx, tc in tool_calls.items():
            yield StreamEvent(
                type=StreamEventType.TOOL_CALL_COMPLETE,
                tool_call=ToolCall(
                    call_id=tc['id'],
                    name=tc['name'],
                    arguments=parse_tool_call_arguements(tc['arguments']),
                ),
            )

        yield StreamEvent(
            type=StreamEventType.MESSAGE_COMPLETE,
            finish_reason=finish_reason,
            usage=usage,
        )    

    async def non_stream_response(self, client: AsyncOpenAI, kwargs: dict[str, Any])->StreamEvent:
        response = await client.chat.completions.create(**kwargs)
        choice = response.choices[0]
        message = choice.message
        
        text_delta = None
        if message.content:
            text_delta = TextDelta(content=message.content)

        tool_calls: list[ToolCall] = []
        if message.tool_calls:
            for tool_call in message.tool_calls:
                tool_calls.append(
                    ToolCall(
                        call_id=tool_call.id,
                        name=tool_call.function.name,
                        arguments=parse_tool_call_arguements(tool_call.function.arguments),
                    )
                )
                
        usage = None
        if response.usage:
            usage = TokenUsage(
                prompt_tokens=response.usage.prompt_tokens,
                completion_tokens=response.usage.completion_tokens,
                total_tokens=response.usage.total_tokens,
                cached_tokens=response.usage.prompt_tokens_details.cached_tokens,
            )
        
        return StreamEvent(
            type=StreamEventType.MESSAGE_COMPLETE,
            text_delta=text_delta,
            finish_reason=choice.finish_reason,
            usage=usage,
        )