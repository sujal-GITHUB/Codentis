import os
from pydantic import BaseModel, Field
from pathlib import Path

class ModelConfig(BaseModel):
    name: str = "gpt-4o"
    temperature: float = Field(default=1, ge=0.0, le=2.0)
    context_window: int = 256000

class Config(BaseModel):
    model: ModelConfig = Field(default_factory=ModelConfig)
    cwd: Path = Field(default_factory=lambda: Path.cwd())
    max_turns: int = 100
    developer_instructions: str | None = None
    user_instructions: str | None = None
    debug: bool = False
    api_key: str | None = None
    base_url: str | None = None

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
            errors.append("No API key found. Please define `api_key` in your `codentis.toml` config file.")
        
        if not self.cwd.exists():
            errors.append("Working directory does not exist : " + str(self.cwd))
        
        return errors