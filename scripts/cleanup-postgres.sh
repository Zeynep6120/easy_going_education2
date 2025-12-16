#!/usr/bin/env bash
set -euo pipefail

echo "This script stops Homebrew Postgres service and (optionally) uninstalls it."
echo "It will only run commands; review before running."

read -r -p "Stop Homebrew postgres service now? [y/N] " RESP
if [[ "$RESP" =~ ^[Yy] ]]; then
  echo "Stopping postgresql service..."
  brew services stop postgresql@14 || brew services stop postgresql || true
  echo "Service stopped (if it existed)."
fi

read -r -p "Uninstall Homebrew postgresql completely? This removes data. [y/N] " RESP2
if [[ "$RESP2" =~ ^[Yy] ]]; then
  echo "Uninstalling postgresql..."
  brew uninstall postgresql@14 || brew uninstall postgresql || true
  echo "Postgres uninstalled. You may want to remove data dir: /opt/homebrew/var/postgresql@14 or /opt/homebrew/var/postgresql"
fi

echo "Done."
