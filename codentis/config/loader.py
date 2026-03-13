from .config import Config
from .config_manager import ConfigManager
from pathlib import Path
from typing import Any
import sys

# Use built-in tomllib for Python 3.11+, fallback to tomli for older versions
if sys.version_info >= (3, 11):
    import tomllib
else:
    try:
        import tomli as tomllib
    except ImportError:
        import tomllib

from platformdirs import user_config_dir
from codentis.utils.errors import ConfigError
import logging
from codentis.ui.renderer import get_console

console = get_console()
logger = logging.getLogger(__name__)
CONFIG_FILE_NAME = "codentis.toml"
AGENT_MD_FILE = "agent.md"

def get_config_dir()->Path:
    return Path(user_config_dir("codentis", appauthor=False))

def get_system_config_path()->Path:
    return get_config_dir() / CONFIG_FILE_NAME

def parse_toml(path: Path)->Config:
    try:
        with open(path, "rb") as f:
            return tomllib.load(f)
    except Exception as e:
        # Handle both tomli.TOMLDecodeError and tomllib.TOMLDecodeError
        if "TOML" in type(e).__name__:
            raise ConfigError(
                message="Failed to parse config file : {e}",
                config_file=str(path),
                cause=e
            )
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
    
    config_dict: dict[str, Any] = {}
    
    # Load from TOML system config (lowest priority)
    system_path = get_system_config_path()
    if system_path.is_file():
        try:
            toml_config = parse_toml(system_path)
            config_dict = merge_dicts(config_dict, toml_config)
        except ConfigError as e:
            logger.warning(f"Skipping invalid system config : {system_path}")
    
    # Load from project config (medium priority)
    project_path = get_project_config(cwd)
    if project_path:
        try:
            project_config_dict = parse_toml(project_path)
            config_dict = merge_dicts(config_dict, project_config_dict)
        except ConfigError as e:
            logger.warning(f"Skipping invalid project config : {project_path}")
    
    # Load from JSON config manager (highest priority - user's explicit choice)
    config_manager = ConfigManager()
    if config_manager.config_exists():
        json_config = config_manager.load_config()
        # Map JSON config to expected format and override TOML values
        if 'api_key' in json_config:
            config_dict['api_key'] = json_config['api_key']
        if 'base_url' in json_config:
            config_dict['base_url'] = json_config['base_url']
        if 'model_name' in json_config:
            if 'model' not in config_dict:
                config_dict['model'] = {}
            config_dict['model']['name'] = json_config['model_name']
    
    if "cwd" not in config_dict:
        config_dict["cwd"] = cwd
    
    if "developer_instructions" not in config_dict:
        agent_md_content = get_agent_md_files(cwd)
        if agent_md_content:
            config_dict['developer_instructions'] = agent_md_content
    
    if "user_instructions" not in config_dict:
        config_dict["user_instructions"] = None
            
    try:
        config = Config(**config_dict)
    except Exception as e:
        raise ConfigError(f'Invalid Configuration: {e}') from e
    
    return config