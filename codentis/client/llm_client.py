from openai import AsyncOpenAI
from typing import AsyncGenerator, Any
from codentis.client.response import StreamEvent, TextDelta, TokenUsage, StreamEventType, ToolCall, ToolCallDelta, parse_tool_call_arguements
from openai import RateLimitError, APIConnectionError, APIError
from codentis.config.config import Config
import asyncio
import os

class TagFilter:
    def __init__(self):
        self.buffer = ""
        self.tags_to_strip = [
            "<|channel|>thought",
            "<|channel|>final<|message|>",
            "<|channel|>call",
            "<|channel|>",
            "<|im_start|>",
            "<|im_end|>",
            "<|thought|>"
        ]
        
    def feed(self, chunk: str) -> str:
        self.buffer += chunk
        output = ""
        while self.buffer:
            if not self.buffer.startswith("<"):
                output += self.buffer[0]
                self.buffer = self.buffer[1:]
                continue
                
            matched_tag = None
            for tag in self.tags_to_strip:
                if self.buffer.startswith(tag):
                    matched_tag = tag
                    break
                    
            if matched_tag:
                self.buffer = self.buffer[len(matched_tag):]
                continue
                
            is_prefix = False
            for tag in self.tags_to_strip:
                if tag.startswith(self.buffer):
                    is_prefix = True
                    break
            
            if not is_prefix:
                if self.buffer.startswith("<|") and "|>" not in self.buffer and len(self.buffer) < 50:
                    is_prefix = True
                elif self.buffer.startswith("<|") and "|>" in self.buffer:
                    end_idx = self.buffer.find("|>") + 2
                    self.buffer = self.buffer[end_idx:]
                    continue
                    
            if is_prefix:
                break
            else:
                output += self.buffer[0]
                self.buffer = self.buffer[1:]
                
        return output

    def flush(self) -> str:
        res = self.buffer
        self.buffer = ""
        return res

class LLMClient:
    def __init__(self, config: Config)->None:
        self.client : AsyncOpenAI | None = None
        self.max_attempts: int = 3
        self.config = config

    def get_client(self)->AsyncOpenAI:
        if self.client is None:
            self.client = AsyncOpenAI(
                api_key=self.config.api_key,
                base_url=self.config.base_url
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
                "model": self.config.model_name,
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
                return
            except KeyboardInterrupt:
                # Handle interruption during API calls
                yield StreamEvent(
                    type=StreamEventType.ERROR,
                    error="API call interrupted by user",
                )
                return
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
                return

    async def stream_response(self, client: AsyncOpenAI, kwargs: dict[str, Any])->AsyncGenerator[StreamEvent, None]:
        try:
            response = await client.chat.completions.create(**kwargs)

            usage: TokenUsage | None = None
            finish_reason : str | None = None
            tool_calls: dict[int, dict[str, Any]] = {}
            tag_filter = TagFilter()

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
                    filtered = tag_filter.feed(delta.content)
                    if filtered:
                        yield StreamEvent(
                            type=StreamEventType.TEXT_DELTA,
                            text_delta=TextDelta(content=filtered),
                        )

                if delta.tool_calls:
                    for i, tool_call_delta in enumerate(delta.tool_calls):
                        idx = tool_call_delta.index if tool_call_delta.index is not None else (tool_call_delta.id or i)
                        if idx not in tool_calls:
                            tool_calls[idx] = {
                                'id' : tool_call_delta.id or "",
                                'name' : "",
                                'arguments' : "",
                                'extra_content': None,
                            }

                        # Check for extra content (used by Gemini for thought_signature)
                        extra_content = None
                        if hasattr(tool_call_delta, "model_extra") and tool_call_delta.model_extra:
                            extra_content = tool_call_delta.model_extra.get("extra_content")
                        if not extra_content and hasattr(tool_call_delta, "extra_content"):
                            extra_content = getattr(tool_call_delta, "extra_content", None)
                        if not extra_content and isinstance(tool_call_delta, dict):
                            extra_content = tool_call_delta.get("extra_content")
                        
                        if extra_content:
                            tool_calls[idx]['extra_content'] = extra_content

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

                # If this chunk signaled completion, break the loop early to avoid blocking on TCP stream EOF
                if choice.finish_reason is not None:
                    break

            flushed = tag_filter.flush()
            if flushed:
                yield StreamEvent(
                    type=StreamEventType.TEXT_DELTA,
                    text_delta=TextDelta(content=flushed),
                )

            for idx, tc in tool_calls.items():
                extra_content = tc.get('extra_content')
                model_name = self.config.model_name.lower() if self.config.model_name else ""
                if not extra_content and ("gemini" in model_name or "google" in model_name):
                    extra_content = {
                        "google": {
                            "thought_signature": "skip_thought_signature_validator"
                        }
                    }
                yield StreamEvent(
                    type=StreamEventType.TOOL_CALL_COMPLETE,
                    tool_call=ToolCall(
                        call_id=tc['id'],
                        name=tc['name'],
                        arguments=parse_tool_call_arguements(tc['arguments']),
                        extra_content=extra_content,
                    ),
                )

            yield StreamEvent(
                type=StreamEventType.MESSAGE_COMPLETE,
                finish_reason=finish_reason,
                usage=usage,
            )
        
        except KeyboardInterrupt:
            # Handle interruption during streaming
            yield StreamEvent(
                type=StreamEventType.ERROR,
                error="Streaming interrupted by user",
            )
            return
        except Exception as e:
            yield StreamEvent(
                type=StreamEventType.ERROR,
                error=f"Streaming error: {str(e)}",
            )
            return    

    async def non_stream_response(self, client: AsyncOpenAI, kwargs: dict[str, Any])->StreamEvent:
        response = await client.chat.completions.create(**kwargs)
        choice = response.choices[0]
        message = choice.message
        
        text_delta = None
        if message.content:
            cleaned = message.content
            for tag in ["<|channel|>thought", "<|channel|>final<|message|>", "<|channel|>call", "<|channel|>", "<|im_start|>", "<|im_end|>", "<|thought|>"]:
                cleaned = cleaned.replace(tag, "")
            import re
            cleaned = re.sub(r'<\|.*?\|>', '', cleaned)
            text_delta = TextDelta(content=cleaned)

        tool_calls: list[ToolCall] = []
        if message.tool_calls:
            for tool_call in message.tool_calls:
                extra_content = None
                if hasattr(tool_call, "model_extra") and tool_call.model_extra:
                    extra_content = tool_call.model_extra.get("extra_content")
                if not extra_content and hasattr(tool_call, "extra_content"):
                    extra_content = getattr(tool_call, "extra_content", None)
                
                model_name = self.config.model_name.lower() if self.config.model_name else ""
                if not extra_content and ("gemini" in model_name or "google" in model_name):
                    extra_content = {
                        "google": {
                            "thought_signature": "skip_thought_signature_validator"
                        }
                    }

                tool_calls.append(
                    ToolCall(
                        call_id=tool_call.id,
                        name=tool_call.function.name,
                        arguments=parse_tool_call_arguements(tool_call.function.arguments),
                        extra_content=extra_content,
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