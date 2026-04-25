#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
export VITE_PORT="${VITE_PORT:-5173}"

npm --prefix "$ROOT_DIR/Code/SaaS/public-website/web" run dev -- --port "$VITE_PORT"
