# Ecommerce Project

This folder now includes a standard multi-platform starter structure for ecommerce development:

- Backend API (`Node.js/Express`)
- Frontend Web (`Vite + React`)
- Frontend Mobile (`React Native` for Android/iOS)
- Frontend Desktop (`React + Electron` for Windows/macOS)

## Folder Structure

```text
Ecommerce/
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

## Quick Start

### 1) Backend

```bash
cd backend
npm init -y
npm i express cors dotenv
npm i -D nodemon
```

Suggested scripts in `backend/package.json`:

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "test": "node --test"
  }
}
```

### 2) Web Frontend (Vite + React)

```bash
cd frontend/web
npm create vite@latest . -- --template react
npm install
npm run dev
```

### 3) Mobile Frontend (React Native)

```bash
cd frontend/mobile
npx create-expo-app@latest .
npx expo start
```

Run targets:
- Android: press `a` in Expo CLI or `npx expo run:android`
- iOS: press `i` in Expo CLI or `npx expo run:ios`

### 4) Desktop Frontend (Windows/macOS)

```bash
cd frontend/desktop
npm init -y
npm i electron
```

Then add your React desktop renderer setup (or use Electron + Vite starter).

## Recommended Development Order

1. Start backend API first.
2. Connect web frontend to backend.
3. Reuse API services in mobile app.
4. Build desktop shell last (shared UI/business logic where possible).
