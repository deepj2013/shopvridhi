# SaaS Project

This SaaS codebase already has running implementations and now also includes a standard platform structure for future scaling.

## Current Working Implementations

- Backend API: `working/api`
- Web frontend (Vite + React): `public-website/web`
- Mobile track: `working/mobile`
- Windows/POS track: `working/windows`

## Standard Platform Structure

```text
SaaS/
  backend/
    src/
    tests/
    config/
    scripts/
  frontend/
    web/
      src/
      public/
    mobile/
      src/
      android/
      ios/
    desktop/
      src/
      windows/
      macos/
```

Use this structure for new clean modules while keeping existing production work under `working/` and `public-website/`.

## How To Start Existing SaaS Apps

### 1) Backend API

```bash
cd working/api
npm install
npm run dev
```

Available scripts:
- `npm run dev`
- `npm start`
- `npm test`
- `npm run test:reset`

### 2) Web Frontend (Vite + React)

```bash
cd public-website/web
npm install
npm run dev
```

Also available:
- `npm run build`
- `npm run preview`
- `npm run test:smoke`

### 3) Mobile Track (React Native plan)

```bash
cd working/mobile
npm install
npm run dev
```

Current mobile folder is a baseline. To bootstrap full React Native:

```bash
npx create-expo-app@latest .
npx expo start
```

### 4) Windows/Desktop Track

```bash
cd working/windows
npm install
npm run dev
```

Current desktop folder is a baseline and can be upgraded to Electron/Tauri runtime.
