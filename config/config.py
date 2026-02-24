from dataclasses import dataclass, field
import os
from dotenv import load_dotenv

load_dotenv()

@dataclass
class Config:
    cwd: str = field(default_factory=os.getcwd)
    model_name: str = field(default_factory=lambda: os.getenv("MODEL_NAME"))
    developer_instructions: str | None = None
    user_instructions: str | None = None
