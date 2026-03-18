from setuptools import setup, find_packages
import os
from pathlib import Path

def get_version():
    """Get version from environment variable or .env file."""
    # First try environment variable
    version = os.getenv('VERSION')
    if version:
        return version.strip('v')  # Remove 'v' prefix if present
    
    # Try to read from .env file
    env_file = Path(__file__).parent / '.env'
    if env_file.exists():
        try:
            with open(env_file, 'r') as f:
                for line in f:
                    if line.startswith('VERSION='):
                        version = line.split('=', 1)[1].strip().strip("'\"")
                        return version.strip('v')  # Remove 'v' prefix if present
        except Exception:
            pass
    
    # Default fallback
    return "1.3.4"

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

with open("requirements.txt", "r", encoding="utf-8") as fh:
    requirements = [line.strip() for line in fh if line.strip() and not line.startswith("#")]

setup(
    name="codentis",
    version=get_version(),
    author="Codentis Team",
    description="An intelligent CLI AI agent for developers",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/sujal-GITHUB/Codentis",
    packages=find_packages(exclude=["tests", "*.tests", "*.tests.*", "tests.*", "venv", "website"]),
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "Topic :: Software Development :: Libraries :: Python Modules",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
    ],
    python_requires=">=3.10",
    install_requires=requirements,
    entry_points={
        "console_scripts": [
            "codentis=codentis.cli:run",
        ],
    },
    include_package_data=True,
)
