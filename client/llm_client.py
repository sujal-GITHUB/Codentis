from openai import AsyncOpenAI
from dotenv import load_dotenv
import os

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_BASE_URL = os.getenv("OPENAI_BASE_URL")

class LLMClient:
    def __init__(self)->None:
        self.client : AsyncOpenAI | None = None
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

    async def chat_completion(
        self,
        messages: list[dict[str, Any]],
        stream: bool = True,
    ):
        client = self.get_client()
        kwargs = {
            "model": "meta-llama/llama-3.3-70b-instruct:free",
            "messages": messages,
            "stream": stream,
        }

        if stream:
            await self.stream_response(client, kwargs)
        else:
            await self.non_stream_response(client, kwargs)
        pass

    async def stream_response(self, client: AsyncOpenAI, kwargs: list[dict[str, Any]]):
        pass

    async def non_stream_response(self, client: AsyncOpenAI, kwargs: list[dict[str, Any]]):
        response = await client.chat.completions.create(**kwargs)
        print(response)