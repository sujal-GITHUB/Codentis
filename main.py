from client.llm_client import LLMClient
import asyncio

async def main():
    client = LLMClient()
    await client.chat_completion(
        messages=[
            {"role": "user", "content": "Hello, how are you?"},
        ],
        stream=False,
    )
    print("done")
    await client.close()
    pass

if __name__ == "__main__":
    asyncio.run(main())
