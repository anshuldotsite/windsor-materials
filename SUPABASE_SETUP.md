## Supabase setup (Windsor Materials)

### 1) Create a Supabase project
- Create a new Supabase project.
- In **Project Settings → API**, copy:
  - **Project URL**
  - **publishable key** (public)
  - *(optional)* **secret key** (server-only; do not expose in `NEXT_PUBLIC_*`)

### 2) Create tables + seed data
- In Supabase: **SQL Editor → New query**
- Run:
  - `supabase/schema.sql`
  - then `supabase/seed.sql`

### 3) Add env vars to Next.js
Create a local env file in your project root:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="YOUR_SUPABASE_PUBLISHABLE_KEY"

# Optional (server-only): use this if you enabled RLS and don't want to create public SELECT policies
# IMPORTANT: never expose this in NEXT_PUBLIC_*
SUPABASE_SECRET_KEY="YOUR_SUPABASE_SECRET_KEY"

# Stripe (required for cart/checkout)
STRIPE_SECRET_KEY="sk_..."
NEXT_PUBLIC_SITE_URL="http://localhost:3000" # or https://your-domain.com
```

Restart `npm run dev` after adding env vars.

### 4) Mark a product as purchasable (Stripe)
To sell only specific products:

- In Supabase table `products`, set:
  - `is_purchasable = true`
  - `stripe_price_id = "price_..."` (from your Stripe dashboard)

Only products with both values set will show **Add to cart** and be allowed in Stripe checkout.

### 4) RLS (optional but recommended)
If you enable Row Level Security, also add public SELECT policies (see commented section in `supabase/schema.sql`).

