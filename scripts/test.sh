#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
export MONGOMS_DOWNLOAD_DIR="$ROOT_DIR/Code/SaaS/working/api/.cache/mongodb-binaries"
export MONGOMS_VERSION="7.0.14"
export MONGOMS_SYSTEM_BINARY="${MONGOMS_SYSTEM_BINARY:-/opt/homebrew/opt/mongodb-community@5.0/bin/mongod}"

echo "[test] Running backend tests"
npm --prefix "$ROOT_DIR/Code/SaaS/working/api" test

echo "[test] Completed"
