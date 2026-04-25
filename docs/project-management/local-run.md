# Local Run Automation

## One-time setup

```bash
npm run setup
```

## Start all services (API + Web)

```bash
npm run dev
```

Default URLs:
- API: `http://localhost:4000` (or value from `PORT`)
- Web: `http://localhost:5173`

## If Mongo in-memory binary download fails

Use system MongoDB binary:

```bash
export MONGOMS_SYSTEM_BINARY=/opt/homebrew/opt/mongodb-community@5.0/bin/mongod
npm run dev:api
```

Or run API with external Mongo:

```bash
export MONGODB_URI=mongodb://localhost:27017/shopvridhi
npm run dev:api
```

## Docker local stack (API + Mongo)

```bash
docker compose up --build
```

## Build web

```bash
npm run build
```

## Run tests

```bash
npm run test
```

## Web smoke checks

```bash
npm --prefix Code/SaaS/public-website/web run test:smoke
```
