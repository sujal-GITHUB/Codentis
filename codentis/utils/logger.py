"""Logging configuration for Codentis."""
import logging
import sys
from pathlib import Path
from platformdirs import user_log_dir

def setup_logger(name: str = "codentis", level: int = logging.INFO) -> logging.Logger:
    """
    Set up a logger with console and file handlers.
    
    Args:
        name: Logger name
        level: Logging level
        
    Returns:
        Configured logger instance
    """
    logger = logging.getLogger(name)
    logger.setLevel(level)
    
    # Avoid duplicate handlers
    if logger.handlers:
        return logger
    
    # Console handler (errors only)
    console_handler = logging.StreamHandler(sys.stderr)
    console_handler.setLevel(logging.ERROR)
    console_formatter = logging.Formatter('%(levelname)s: %(message)s')
    console_handler.setFormatter(console_formatter)
    logger.addHandler(console_handler)
    
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
        logger.addHandler(file_handler)
    except Exception as e:
        # If file logging fails, just continue with console logging
        logger.error(f"Failed to set up file logging: {e}")
    
    return logger

def get_logger(name: str = "codentis") -> logging.Logger:
    """Get or create a logger instance."""
    logger = logging.getLogger(name)
    if not logger.handlers:
        return setup_logger(name)
    return logger
