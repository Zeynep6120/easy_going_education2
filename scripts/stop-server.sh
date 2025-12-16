#!/usr/bin/env bash
set -euo pipefail

PIDFILE=/tmp/ege_server.pid
if [[ -f "$PIDFILE" ]]; then
  PID=$(cat "$PIDFILE")
  echo "Stopping server with PID $PID..."
  kill "$PID" || true
  rm -f "$PIDFILE"
  echo "Stopped. Logs: /tmp/ege_server.log"
else
  echo "PID file $PIDFILE not found. Server may not be running or was started differently."
fi
