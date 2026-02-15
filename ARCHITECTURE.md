# Architecture Overview

Codentis is built on a clean, event-driven, multi-layered architecture designed for extensibility and robustness. The core principle is the separation of concerns between the user interface, the agentic logic, and the low-level LLM communication.

```mermaid
graph TD
    CLI[CLI (main.py)] -->|Initializes| Agent[Agent (agent/agent.py)]
    CLI -->|Initializes| TUI[TUI (ui/renderer.py)]
    Agent -->|Uses| LLMClient[LLMClient (client/llm_client.py)]
    LLMClient -->|API Calls| OpenAI[OpenAI / OpenRouter API]

    subgraph Data Flow
        OpenAI -->|Raw Chunks| LLMClient
        LLMClient -->|StreamEvent| Agent
        Agent -->|AgentEvent| CLI
        CLI -->|Render| TUI
    end
```

## Core Components

### 1. Client Layer (`client/`)
This layer handles all external communication with Large Language Models.
- **`LLMClient`**: A wrapper around the `AsyncOpenAI` client. It handles:
  - Authentication (via `.env`).
  - Rate Limiting (automatic retries with exponential backoff).
  - Response Streaming (yields typed `StreamEvent` objects).
- **`response.py`**: Defines the data structures for LLM responses (`StreamEvent`, `StreamEventType`, `TokenUsage`).

### 2. Agent Layer (`agent/`)
This layer contains the core logic of the AI assistant.
- **`Agent`**: Manages the conversation state and the "agentic loop". It transforms low-level `StreamEvent`s into high-level, semantic `AgentEvent`s.
- **`events.py`**: Defines the events that the agent can emit, such as `TEXT_DELTA`, `AGENT_ERROR`, or `TOOL_CALL` (future).

### 3. UI Layer (`ui/`)
This layer is responsible for rendering the output to the terminal.
- **`TUI`**: Built with `rich`, it handles text styling, streaming output, rule lines, and other visual elements.
- **`renderer.py`**: Configuration for the console theme and styles.

### 4. Application Entry (`main.py`)
The glue that binds everything together.
- Uses `click` to handle command-line arguments.
- Initializes the `CLI` class, which manages the `Agent` and `TUI` instances.
- Runs the asynchronous event loop using `asyncio.run()`.

## Event System

The application relies heavily on Python's `AsyncGenerator` to stream data through the layers.

### StreamEvent (Client Level)
Represents a raw chunk of data from the LLM.
- `type`: `TEXT_DELTA`, `MESSAGE_COMPLETE`, `ERROR`
- `text_delta`: The actual text fragment.
- `usage`: Token usage statistics (populated on completion).

### AgentEvent (Agent Level)
Represents a high-level action or state change in the agent.
- `type`: `AGENT_START`, `TEXT_DELTA`, `TEXT_COMPLETE`, `AGENT_ERROR`
- `data`: A dictionary containing relevant payload (e.g., `{"content": "Hello world"}`).

## Future Extensions

The architecture is designed to support:
- **Tool Use**: The `Agent` can easily intercepts `TOOL_CALL` events and delegate them to a tool execution layer.
- **Memory**: A `Memory` component can be injected into the `Agent` to manage long-term context.
- **Multi-Agent**: The `CLI` can orchestrate multiple `Agent` instances for complex workflows.
