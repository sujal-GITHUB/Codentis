"""Auto-update checker for Codentis."""

import httpx
from packaging import version
from codentis import __version__


def check_for_updates() -> dict | None:
    """
    Check if a new version is available on GitHub.
    
    Returns:
        dict with 'version', 'url', 'notes' if update available, None otherwise
    """
    try:
        response = httpx.get(
            "https://api.github.com/repos/sujal-GITHUB/Codentis/releases/latest",
            timeout=5.0,
            follow_redirects=True
        )
        
        if response.status_code != 200:
            return None
        
        data = response.json()
        latest_version = data.get("tag_name", "").lstrip("v")
        
        if not latest_version:
            return None
        
        # Compare versions
        current = version.parse(__version__)
        latest = version.parse(latest_version)
        
        if latest > current:
            return {
                "version": latest_version,
                "url": data.get("html_url"),
                "notes": data.get("body", ""),
                "download_url": _get_platform_download_url(data.get("assets", []))
            }
        
        return None
    
    except Exception:
        # Silently fail - don't interrupt user experience
        return None


def _get_platform_download_url(assets: list) -> str | None:
    """Get the appropriate download URL for the current platform."""
    import platform
    
    system = platform.system().lower()
    
    for asset in assets:
        name = asset.get("name", "").lower()
        download_url = asset.get("browser_download_url")
        
        if system == "windows" and "setup" in name and name.endswith(".exe"):
            return download_url
        elif system == "darwin" and name.endswith(".pkg"):
            return download_url
        elif system == "linux" and name.endswith(".deb"):
            return download_url
    
    return None


def should_check_for_updates() -> bool:
    """
    Determine if we should check for updates.
    Only check once per day to avoid spamming GitHub API.
    """
    import os
    from pathlib import Path
    from datetime import datetime, timedelta
    from platformdirs import user_cache_dir
    
    cache_dir = Path(user_cache_dir("codentis"))
    cache_dir.mkdir(parents=True, exist_ok=True)
    
    last_check_file = cache_dir / "last_update_check"
    
    if not last_check_file.exists():
        return True
    
    try:
        last_check = datetime.fromtimestamp(last_check_file.stat().st_mtime)
        return datetime.now() - last_check > timedelta(days=1)
    except Exception:
        return True


def mark_update_checked():
    """Mark that we've checked for updates."""
    from pathlib import Path
    from platformdirs import user_cache_dir
    
    cache_dir = Path(user_cache_dir("codentis"))
    cache_dir.mkdir(parents=True, exist_ok=True)
    
    last_check_file = cache_dir / "last_update_check"
    last_check_file.touch()
