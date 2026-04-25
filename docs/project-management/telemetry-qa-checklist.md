# Telemetry QA Checklist

- [ ] Login success emits `login_success`.
- [ ] Login failure emits `login_failed`.
- [ ] Add-item flow emits `inventory_item_added`.
- [ ] Order creation emits `order_created`.
- [ ] Admin tab interactions emit `admin_tab_opened`.
- [ ] Public CTA buttons emit `cta_click`.
- [ ] Lead submit emits both `cta_click` and persisted lead record.
- [ ] Event payload does not include unmasked sensitive fields.
