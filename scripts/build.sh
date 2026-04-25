#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "[build] Building web app"
npm --prefix "$ROOT_DIR/Code/SaaS/public-website/web" run build

echo "[build] Build complete"
