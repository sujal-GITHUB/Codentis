import os
from pydantic import BaseModel, Field
from pathlib import Path

class ModelConfig(BaseModel):
    name: str = "arcee-ai/trinity-large-preview:free"
    temperature: float = Field(default=1, ge=0.0, le=2.0)
    context_window: int = 256000

class Config(BaseModel):
    model: ModelConfig = Field(default_factory=ModelConfig)
    cwd: Path = Field(default_factory=lambda: Path.cwd())
    max_turns: int = 100
    max_tool_output_tokens: int = 50000
    developer_instructions: str | None = None
    user_instructions: str | None = None
    debug: bool = False

    @property
    def api_key(self) -> str | None:
        return os.getenv("API_KEY")
        
    @property
    def base_url(self) -> str | None:
        return os.getenv("BASE_URL")

    @property
    def model_name(self) -> str:
        return self.model.name

    @model_name.setter
    def model_name(self, value: str):
        self.model.name = value

    @property
    def model_temperature(self) -> float:
        return self.model.temperature

    @model_temperature.setter
    def model_temperature(self, value: float):
        self.model.temperature = value

    @property
    def model_context_window(self) -> int:
        return self.model.context_window

    @model_context_window.setter
    def model_context_window(self, value: int):
        self.model.context_window = value

    def validate(self)->list[str]:
        errors = []

        if not self.api_key:
            errors.append("No API key found. Set API_KEY environment variable.")
        
        if not self.cwd.exists():
            errors.append("Working directory does not exist : " + str(self.cwd))
        
        return errors