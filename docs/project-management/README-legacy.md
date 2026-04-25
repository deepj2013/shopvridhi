# ShopVridhi Product Starter (Hardened Milestone)

This repository now includes a production-style starter with:

- Public SaaS website (`web/index.html`)
- JWT authentication with refresh flow (`/api/v1/auth/login`, `/refresh`, `/logout`)
- MongoDB persistence via Mongoose (external URI supported, in-memory Mongo fallback for local development)
- RBAC middleware with action-level permission checks
- Universal admin APIs and dashboard screens (tenants/users/plans)
- Inventory + e-commerce order flow with stock deduction
- Audit logs for critical create/update actions

## Run API

```bash
cd api
cp .env.example .env
npm install
npm run dev
```

## Open Web

Open `web/index.html` and use demo users with password `pass123`.
