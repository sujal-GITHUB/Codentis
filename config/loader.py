from .config import Config
from pathlib import Path
from typing import Any
import tomli
from platformdirs import user_config_dir
from utils.errors import ConfigError
import logging

logger = logging.getLogger(__name__)
CONFIG_FILE_NAME = "codentis.json"
AGENT_MD_FILE = "agent.md"

def get_config_dir()->Path:
    return Path(user_config_dir("codentis"))

def get_system_config_path()->Path:
    return get_config_dir() / CONFIG_FILE_NAME

def parse_toml(path: Path)->Config:
    try:
        with open(path, "rb") as f:
            return tomli.load(f)
    except tomli.TOMLDecodeError as e:
        raise ConfigError(
            message="Failed to parse config file : {e}",
            config_file=str(path),
            cause=e
        )
    except (OSError, IOError) as e:
        raise ConfigError(
            message="Failed to read config file : {e}",
            config_file=str(path),
            cause=e
        )

def get_project_config(cwd: Path)->Path:
    curr = cwd.resolve()
    agent_dir = curr / ".agent"

    if agent_dir.is_dir():
        config_path = agent_dir / CONFIG_FILE_NAME
        if config_path.is_file():
            return config_path
    
    return None

def merge_dicts(a: dict[str, Any], b: dict[str, Any])->dict[str, Any]:
    result = a.copy()
    for k, v in b.items():
        if k in result:
            if isinstance(result[k], dict) and isinstance(v, dict):
                result[k] = merge_dicts(result[k], v)
            else:
                result[k] = v
        else:
            result[k] = v
    return result

def get_agent_md_files(cwd: Path)->Path | None:
    curr = cwd.resolve()

    if curr.is_dir():
        agent_dir = curr / ".agent"
        agent_md_file = agent_dir/AGENT_MD_FILE
        if agent_md_file.is_file():
            content = agent_md_file.read_text(encoding='utf-8')
            return content

    return None

def load_config(cwd: Path | None)->Config:
    cwd = cwd or Path.cwd()
    system_path = get_system_config_path()
    
    if system_path.is_file():
        try:
            with open(system_path, "rb") as f:
                config_dict = tomli.load(f)
                return Config(**config_dict)
        except Exception:
            pass

    config_dict: dict[str, Any] = {}
    
    if system_path.is_file():
        try:
            config_dict = parse_toml(system_path)
        except ConfigError as e:
            logger.warning(f"Skipping invalid system config : {system_path}")
    
    project_path = get_project_config(cwd)
    if project_path:
        try:
            project_config_dict = parse_toml(project_path)
            config_dict = merge_dicts(config_dict, project_config_dict)
        except ConfigError as e:
            logger.warning(f"Skipping invalid project config : {project_path}")
    
    if "cwd" not in config_dict:
        config_dict["cwd"] = cwd
    
    if "developer_instructions" not in config_dict:
        agent_md_content = get_agent_md_files(cwd)
        if agent_md_content:
            config_dict['developer_instructions'] = agent_md_content
            
    try:
        config = Config(**config_dict)
    except Exception as e:
        raise ConfigError(f'Invalid Configuration: {e}') from e
    
    return config
    
    if "user_instructions" not in config_dict:
        config_dict["user_instructions"] = None
    
    return Config(**config_dict)