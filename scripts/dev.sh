#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

npx --prefix "$ROOT_DIR" concurrently   -n API,WEB   -c cyan,magenta   "bash $ROOT_DIR/scripts/dev-api.sh"   "bash $ROOT_DIR/scripts/dev-web.sh"
