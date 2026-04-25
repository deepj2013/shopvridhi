#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "[setup] Installing root dependencies"
npm --prefix "$ROOT_DIR" install

echo "[setup] Installing backend dependencies"
npm --prefix "$ROOT_DIR/Code/SaaS/working/api" install

echo "[setup] Installing web dependencies"
npm --prefix "$ROOT_DIR/Code/SaaS/public-website/web" install

echo "[setup] Completed"
