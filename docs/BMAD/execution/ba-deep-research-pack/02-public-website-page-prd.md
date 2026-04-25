# BA Deep Research Pack: Public Website Page-by-Page PRD

## Product Website Goal
Convert visitors into trial users, demo bookings, and paid merchants by proving speed, trust, and business growth impact.

## Primary Conversion Paths
- Start free trial
- Book live demo
- Talk to onboarding expert
- Download brochure/feature PDF

## Global Requirements (All Pages)
- bilingual-ready copy slots (English/Hindi)
- mobile-first rendering
- trust blocks (security, GST-readiness, support)
- sticky CTA on long pages
- structured analytics events

## Page 1: Home (`/`)

### Purpose
Explain value proposition quickly and route users to trial/demo.

### Sections
- Hero: one-line value + primary CTA + secondary CTA
- Pain-to-solution strip: billing, stock, udhaar, growth
- Core capability cards
- Competitive comparison mini-table
- Testimonials and logos
- Pricing teaser
- FAQ
- final CTA block

### Functional Requirements
- primary CTA visible above fold
- page load optimized for low bandwidth
- click-to-WhatsApp support entry

### Events
- `home_cta_trial_click`
- `home_cta_demo_click`
- `home_compare_expand`

## Page 2: Features (`/features`)

### Purpose
Provide deep capability detail by module and role.

### Modules to show
- POS billing
- inventory (rack/shelf/bin)
- purchase and supplier
- udhaar and recovery
- CRM and WhatsApp
- e-commerce and marketplace
- admin and analytics

### Requirements
- each module includes: problem, workflow, measurable outcome
- role tabs: owner, manager, cashier, staff
- quick links to product tour and pricing

### Events
- `feature_module_view`
- `feature_role_tab_switch`
- `feature_cta_click`

## Page 3: Solutions by Shop Type (`/solutions`)

### Purpose
Show category-fit confidence for kirana, garments, hardware, electrical, stationery, and others.

### Requirements
- category-specific pain points
- preconfigured template highlights
- industry-specific reports example

### Events
- `solution_category_select`
- `solution_demo_click`

## Page 4: Pricing (`/pricing`)

### Purpose
Drive plan understanding and paid conversion with clarity.

### Requirements
- plan comparison table
- add-on breakdown (WhatsApp credits, advanced analytics, marketplace pack)
- usage limits and fair use notes
- ROI estimator widget

### Events
- `pricing_plan_select`
- `pricing_roi_use`
- `pricing_checkout_start`

## Page 5: Compare (`/compare`)

### Purpose
Position directly vs key alternatives.

### Requirements
- transparent feature matrix
- migration support section
- switching checklist

### Events
- `compare_tool_select`
- `compare_start_migration_click`

## Page 6: Marketplace (`/marketplace`)

### Purpose
Explain how local ordering and commission growth works.

### Requirements
- discovery -> order -> bill -> delivery visual flow
- merchant benefits and control knobs
- commission model explainer

### Events
- `marketplace_enable_interest`
- `marketplace_demo_click`

## Page 7: Security and Compliance (`/security`)

### Purpose
Build trust with data handling, audit, and backup posture.

### Requirements
- encryption, tenancy, backup, incident response overview
- compliance FAQ
- contact security team form

### Events
- `security_contact_click`

## Page 8: Customers and Stories (`/customers`)

### Purpose
Provide social proof and category relevance.

### Requirements
- case studies by category
- quantified outcomes
- video or quote snippets

### Events
- `case_study_open`
- `customer_cta_click`

## Page 9: Resources (`/resources`)

### Purpose
Support evaluation and onboarding.

### Requirements
- guides, webinars, help docs
- downloadable onboarding checklist

### Events
- `resource_download`
- `resource_signup_click`

## Page 10: Contact and Demo (`/contact`)

### Purpose
Capture high-intent leads with fast response routing.

### Form Fields
- name (required)
- phone (required)
- business type (required)
- current software (optional)
- city/pincode (required)
- monthly billing volume (optional)

### SLAs
- demo callback within 30 minutes (business hours)
- lead assignment to sales queue in < 2 minutes

### Events
- `contact_form_submit`
- `contact_whatsapp_click`
