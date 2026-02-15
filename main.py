import asyncio
import click
from typing import Any
from agent.agent import Agent
from agent.events import AgentEventType
from ui.renderer import TUI, get_console

console = get_console()

class CLI:
    def __init__(self):
        self.agent : Agent | None = None
        self.tui = TUI(console)

    async def run_single(self, message: str):
        async with Agent() as agent:
            self.agent = agent
            await self.__process_message(message)
            
    async def __process_message(self, message: str):
        if not self.agent:
            return None

        assistant_streaming = False

        async for event in self.agent.run(message):
            if event.type == AgentEventType.TEXT_DELTA:
                content = event.data.get("content")
                if content:
                    if not assistant_streaming:
                        self.tui.begin_assistant()
                        assistant_streaming = True
                    self.tui.stream_assistant_delta(content)
                
                elif event.type == AgentEventType.TEXT_COMPLETE:
                    final_response = event.data.get("content")
                    if assistant_streaming:
                        assistant_streaming = False
                        self.tui.end_assistant()
                        assistant_streaming = False
            
        return final_response

@click.command()
@click.argument("prompt", required=False)
def main(prompt: str | None):
    cli = CLI()

    if prompt:
        result = asyncio.run(cli.run_single(prompt))
        if result is None:
            sys.exit(1)

main()
