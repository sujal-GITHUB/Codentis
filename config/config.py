from dataclasses import dataclass
import os

@dataclass
class Config:
    cwd: str = os.getcwd()
    developer_instructions: str | None = None
    user_instructions: str | None = None
