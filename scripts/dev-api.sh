#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
export MONGOMS_DOWNLOAD_DIR="$ROOT_DIR/Code/SaaS/working/api/.cache/mongodb-binaries"
export MONGOMS_VERSION="7.0.14"
export PORT="${PORT:-4300}"

npm --prefix "$ROOT_DIR/Code/SaaS/working/api" run dev
