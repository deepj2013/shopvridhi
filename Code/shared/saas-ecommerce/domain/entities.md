# Shared Domain Entities

- user: id, name, email, role, active
- tenant: id, name, status, planCode
- plan: id, code, name, monthlyPrice, features
- item: id, name, sku, barcode, category, price, stock, location, online
- order: id, customerName, customerPhone, items, status, total, createdBy
- audit: id, actorId, action, entityType, entityId, payload, createdAt
