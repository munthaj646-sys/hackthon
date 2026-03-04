"""
MediAI — Safe Backend Starter
Run this instead of `python main.py` to get a crash-proof server.
- Kills any old instance on port 8000 first
- Runs WITHOUT hot-reload (the main crash cause)
- Auto-restarts if it crashes unexpectedly
"""
import subprocess
import sys
import os
import time
import signal

def kill_port(port: int):
    """Kill any process using the given port."""
    try:
        result = subprocess.run(
            f"netstat -ano | findstr :{port}",
            shell=True, capture_output=True, text=True
        )
        for line in result.stdout.strip().splitlines():
            parts = line.strip().split()
            if parts and parts[-1].isdigit():
                pid = int(parts[-1])
                try:
                    os.kill(pid, signal.SIGTERM)
                    print(f"[Launcher] Killed old process {pid} on port {port}")
                except Exception:
                    pass
    except Exception as e:
        print(f"[Launcher] Could not clean port {port}: {e}")

def main():
    print("=" * 55)
    print("  MediAI Backend Launcher")
    print("  Multilingual · SQLite · DeepSeek API")
    print("=" * 55)

    # Kill any old server on port 8000
    kill_port(8000)
    time.sleep(1)

    retries = 0
    max_retries = 5

    while retries < max_retries:
        print(f"\n[Launcher] Starting server... (attempt {retries + 1})")
        proc = subprocess.run(
            [sys.executable, "-m", "uvicorn", "main:app",
             "--host", "0.0.0.0",
             "--port", "8000",
             "--log-level", "info",
             # NO --reload here — that was causing all the crashes!
            ],
            cwd=os.path.dirname(os.path.abspath(__file__))
        )

        exit_code = proc.returncode
        if exit_code == 0:
            print("[Launcher] Server stopped normally.")
            break
        else:
            retries += 1
            print(f"[Launcher] Server crashed (exit {exit_code}). Restarting in 2 seconds... ({retries}/{max_retries})")
            time.sleep(2)

    if retries >= max_retries:
        print("[Launcher] Too many crashes. Please check errors above.")

if __name__ == "__main__":
    main()
