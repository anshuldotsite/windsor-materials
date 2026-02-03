import "server-only";

import { NextResponse } from "next/server";
import { getStripeServerClient, getSiteUrl } from "@/lib/stripe/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type Body = {
  items?: Array<{
    slug?: string;
    quantity?: number;
  }>;
};

function normalizeQty(qty: unknown) {
  const n = typeof qty === "number" ? qty : Number(qty);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(99, Math.floor(n)));
}

export async function POST(req: Request) {
  const stripe = getStripeServerClient();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured (missing STRIPE_SECRET_KEY)." },
      { status: 500 }
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const items = (body.items ?? [])
    .map((i) => ({
      slug: String(i.slug ?? ""),
      quantity: normalizeQty(i.quantity),
    }))
    .filter((i) => i.slug);

  if (items.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured (missing URL/key)." },
      { status: 500 }
    );
  }

  const slugs = Array.from(new Set(items.map((i) => i.slug)));
  const { data, error } = await supabase
    .from("products")
    .select("slug,is_purchasable,stripe_price_id")
    .in("slug", slugs);

  if (error) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("[supabase] checkout lookup error:", error);
    }
    return NextResponse.json({ error: "Failed to load products." }, { status: 500 });
  }

  const bySlug = new Map(
    (data ?? []).map((p: any) => [
      String(p.slug),
      {
        is_purchasable: Boolean(p.is_purchasable),
        stripe_price_id: p.stripe_price_id == null ? null : String(p.stripe_price_id),
      },
    ])
  );

  const missing = slugs.filter((s) => !bySlug.has(s));
  if (missing.length) {
    return NextResponse.json(
      { error: `Unknown products in cart: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  // Build Stripe line items from DB, not from client-provided pricing.
  const line_items: Array<{ price: string; quantity: number }> = [];
  for (const item of items) {
    const p = bySlug.get(item.slug)!;
    if (!p.is_purchasable) {
      return NextResponse.json(
        { error: `Product not purchasable: ${item.slug}` },
        { status: 400 }
      );
    }
    if (!p.stripe_price_id || !p.stripe_price_id.startsWith("price_")) {
      return NextResponse.json(
        { error: `Missing/invalid stripe_price_id for: ${item.slug}` },
        { status: 400 }
      );
    }
    line_items.push({ price: p.stripe_price_id, quantity: item.quantity });
  }

  const siteUrl = getSiteUrl();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/cart`,
  });

  return NextResponse.json({ url: session.url });
}

