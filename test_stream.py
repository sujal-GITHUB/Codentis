import asyncio
from typing import Any
from client.llm_client import LLMClient
from config.config import Config

async def main():
    config = Config()
    client = LLMClient(config)
    
    events = []
    async for event in client.chat_completion([{'role': 'user', 'content': 'Hello'}]):
        print(event)
        
if __name__ == '__main__':
    asyncio.run(main())
