"""Logging configuration for Codentis."""
import logging
import sys
from pathlib import Path
from platformdirs import user_log_dir

class LoggerManager:
    """Manages logging configuration with singleton pattern."""
    
    _instances = {}
    
    def __new__(cls, name: str = "codentis", level: int = logging.INFO):
        if name not in cls._instances:
            cls._instances[name] = super().__new__(cls)
        return cls._instances[name]
    
    def __init__(self, name: str = "codentis", level: int = logging.INFO):
        if hasattr(self, '_initialized'):
            return
        self._initialized = True
        
        self.name = name
        self.level = level
        self.logger = logging.getLogger(name)
        self.logger.setLevel(level)
        
        # Avoid duplicate handlers
        if self.logger.handlers:
            return
        
        # Console handler (errors only)
        console_handler = logging.StreamHandler(sys.stderr)
        console_handler.setLevel(logging.ERROR)
        console_formatter = logging.Formatter('%(levelname)s: %(message)s')
        console_handler.setFormatter(console_formatter)
        self.logger.addHandler(console_handler)
        
        # File handler (all logs)
        try:
            log_dir = Path(user_log_dir("codentis", appauthor=False))
            log_dir.mkdir(parents=True, exist_ok=True)
            log_file = log_dir / "codentis.log"
            
            file_handler = logging.FileHandler(log_file, encoding='utf-8')
            file_handler.setLevel(level)
            file_formatter = logging.Formatter(
                '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
            )
            file_handler.setFormatter(file_formatter)
            self.logger.addHandler(file_handler)
        except Exception as e:
            # If file logging fails, just continue with console logging
            self.logger.error(f"Failed to set up file logging: {e}")
    
    @classmethod
    def get_logger(cls, name: str = "codentis") -> logging.Logger:
        """Get or create a logger instance."""
        instance = cls._instances.get(name)
        if instance is None:
            instance = cls(name)
        return instance.logger
    
    def set_level(self, level: int) -> None:
        """Set logging level."""
        self.level = level
        self.logger.setLevel(level)
        for handler in self.logger.handlers:
            handler.setLevel(level)
    
    def add_handler(self, handler: logging.Handler) -> None:
        """Add a custom handler."""
        self.logger.addHandler(handler)
    
    def remove_handler(self, handler: logging.Handler) -> None:
        """Remove a handler."""
        self.logger.removeHandler(handler)