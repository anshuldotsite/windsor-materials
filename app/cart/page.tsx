"use client";

import Link from "next/link";
import Navbar from "@/components/navbar/page";
import Footer from "@/components/footer/page";
import { useCart } from "@/components/cart/CartProvider";
import { useMemo, useState } from "react";

export default function CartPage() {
  const { items, itemCount, removeItem, setQuantity, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cartLines = useMemo(
    () =>
      items.map((i) => ({
        slug: i.slug,
        quantity: i.quantity,
      })),
    [items]
  );

  const checkout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ items: cartLines }),
      });

      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      if (!data.url) throw new Error("Missing checkout URL");

      window.location.href = data.url;
    } catch (e: any) {
      setError(e?.message ?? "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex flex-col grow pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-6">
            <h1 className="text-4xl font-light text-[#1F3A5F]">Your Cart</h1>
            <div className="text-sm text-gray-500 font-light">{itemCount} item(s)</div>
          </div>

          {items.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl p-12 text-center">
              <p className="text-gray-500 mb-8 text-lg font-light">Your cart is currently empty.</p>
              <Link
                href="/collections"
                className="inline-block px-8 py-3 bg-[#1F3A5F] text-white hover:bg-[#E3A008] transition-colors rounded-full font-medium"
              >
                Browse Collections
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                {items.map((item) => (
                  <div key={item.slug} className="flex gap-6 items-center p-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
                    <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.slug}`}
                        className="text-lg font-medium text-[#1F3A5F] hover:text-[#E3A008] transition-colors truncate block"
                      >
                        {item.name}
                      </Link>
                      <div className="text-sm text-gray-500 mt-1 font-light">{item.price_text ?? ""}</div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <input
                          type="number"
                          min={1}
                          max={99}
                          value={item.quantity}
                          onChange={(e) => setQuantity(item.slug, Number(e.target.value))}
                          className="w-16 px-3 py-2 text-center text-sm text-[#1F3A5F] outline-none bg-transparent"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.slug)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {error ? (
                <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                  {error}
                </div>
              ) : null}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-100">
                <button
                  type="button"
                  onClick={clear}
                  className="text-sm text-gray-400 hover:text-[#1F3A5F] transition-colors font-light"
                >
                  Clear all items
                </button>

                <button
                  type="button"
                  onClick={checkout}
                  disabled={loading}
                  className="w-full sm:w-auto px-10 py-4 bg-[#E3A008] text-white font-medium hover:bg-[#1F3A5F] transition-all rounded-full shadow-lg shadow-[#E3A008]/20 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:bg-[#E3A008]"
                >
                  {loading ? "Redirecting…" : "Proceed to Checkout"}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
