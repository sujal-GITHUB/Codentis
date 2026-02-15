# Codentis

![Python](https://img.shields.io/badge/python-3.10+-blue.svg)
![Rich](https://img.shields.io/badge/UI-Rich-purple.svg)
![Status](https://img.shields.io/badge/status-Alpha-orange.svg)

**Codentis** is an intelligent, high-performance CLI AI agent designed to bring the power of LLMs directly to your terminal. Inspired by tools like Claude Code, it features a beautiful TUI, robust error handling, and a modular architecture for building complex agentic loop workflows.

## Features

- **Beautiful TUI**: Built with `rich`, offering syntax highlighting, streaming responses, and clean visual separation.
- **Resilient Client**: Automatic retries with exponential backoff for rate limits and connection errors.
- **Modular Design**: clear separation of concerns:
  - **Client**: Handles LLM communication (OpenAI-compatible).
  - **Agent**: Manages state, context, and the agentic loop.
  - **UI**: Handles rendering and user interaction.
- **Async Core**: Fully asynchronous implementation for high performance.


## Getting Started

### Prerequisites

- Python 3.10+
- An API Key (OpenAI, OpenRouter, etc.)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sujal-GITHUB/Codentis.git
    cd Codentis
    ```

2.  **Create a virtual environment:**
    ```bash
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # Linux/Mac
    source venv/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure Environment:**
    Create a `.env` file in the root directory:
    ```env
    OPENAI_API_KEY=your_api_key_here
    OPENAI_BASE_URL=https://openrouter.ai/api/v1  # Optional: For OpenRouter or local LLMs
    ```

### Usage

Run the agent with a prompt directly from the command line:

```bash
python main.py "Explain quantum computing in one sentence."
```

Or just run the script (shell mode coming soon):

```bash
python main.py
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
