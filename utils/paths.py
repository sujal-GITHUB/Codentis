from pathlib import Path

def resolve_path(base: str | Path, path: str | Path) -> Path:
    path = Path(path)
    if path.is_absolute():
        return path.resolve()

    base = Path(base)
    return base.resolve() / path.resolve() 

def is_binary_file(path: Path) -> bool:
    """Check if a file is binary by looking for null bytes."""
    try:
        with open(path, "rb") as f:
            chunk = f.read(8192)
            return b"\x00" in chunk
    except Exception:
        return False

def display_path_relative_to_cwd(path: Path) -> str:
    try:
        path = Path(path)
    except Exception:
        return str(path)
    
    cwd = Path.cwd()
    try:
        return str(path.relative_to(cwd))
    except Exception:
        pass
    
    return str(path)