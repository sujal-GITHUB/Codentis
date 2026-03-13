"""
Codentis - An intelligent CLI AI agent for developers.

This is a compatibility shim for the old main.py entry point.
Use 'codentis' command after installation instead.
"""
import sys
from codentis.cli import run

if __name__ == "__main__":
    print("Note: After installation, use 'codentis' command instead of 'python main.py'")
    run()

