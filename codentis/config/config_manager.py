"""Configuration manager for Codentis."""
import json
from pathlib import Path
from typing import Any, Dict, Optional
from platformdirs import user_config_dir
import logging

logger = logging.getLogger(__name__)

class ConfigManager:
    """Manages user configuration stored in ~/.codentis/config.json"""
    
    def __init__(self):
        self.config_dir = Path(user_config_dir("codentis", appauthor=False))
        self.config_file = self.config_dir / "config.json"
        self._config_cache: Dict[str, Any] | None = None
        self._config_cache_timestamp = 0
    
    def ensure_config_dir(self) -> None:
        """Create config directory if it doesn't exist."""
        self.config_dir.mkdir(parents=True, exist_ok=True)
    
    def config_exists(self) -> bool:
        """Check if configuration file exists."""
        return self.config_file.exists()
    
    def load_config(self) -> Dict[str, Any]:
        """Load configuration from file with caching."""
        from time import time
        
        # Check if cache is still valid (1 minute)
        current_time = time()
        if self._config_cache is not None and (current_time - self._config_cache_timestamp) < 60:
            return self._config_cache
        
        if not self.config_exists():
            return {}
        
        try:
            with open(self.config_file, 'r', encoding='utf-8') as f:
                config = json.load(f)
                self._config_cache = config
                self._config_cache_timestamp = current_time
                return config
        except (json.JSONDecodeError, IOError) as e:
            logger.error(f"Failed to load config: {e}")
            return {}
    
    def save_config(self, config: Dict[str, Any]) -> None:
        """Save configuration to file."""
        self.ensure_config_dir()
        
        try:
            with open(self.config_file, 'w', encoding='utf-8') as f:
                json.dump(config, f, indent=2)
            self._config_cache = None  # Invalidate cache
        except IOError as e:
            logger.error(f"Failed to save config: {e}")
            raise
    
    def get(self, key: str, default: Any = None) -> Any:
        """Get a configuration value."""
        config = self.load_config()
        return config.get(key, default)
    
    def set(self, key: str, value: Any) -> None:
        """Set a configuration value."""
        config = self.load_config()
        config[key] = value
        self.save_config(config)
    
    def update(self, updates: Dict[str, Any]) -> None:
        """Update multiple configuration values."""
        config = self.load_config()
        config.update(updates)
        self.save_config(config)
    
    def get_api_key(self) -> Optional[str]:
        """Get API key from config."""
        return self.get('api_key')
    
    def get_base_url(self) -> Optional[str]:
        """Get base URL from config."""
        return self.get('base_url')
    
    def get_model_name(self) -> Optional[str]:
        """Get model name from config."""
        return self.get('model_name')
    
    def get_provider(self) -> Optional[str]:
        """Get AI provider from config."""
        return self.get('provider')
    
    def clear_cache(self) -> None:
        """Clear configuration cache."""
        self._config_cache = None
        self._config_cache_timestamp = 0