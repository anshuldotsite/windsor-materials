import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export type ProductRow = {
  id: string;
  slug: string;
  name: string;
  category: string | null;
  description: string | null;
  features: string[];
  specifications: Record<string, unknown>;
  image_url: string | null;
  collection_slug: string | null;
};

const STATIC_IMAGES: Record<string, string> = {
  "kitchen-cabinets-custom": "/cabinet.png",
  "quartz-countertops": "/quartz.png",
  "closets-wardrobes-custom": "/closet.png",
  "bathroom-vanities": "/vanity.png",
  "kitchen-sinks": "/sink.png",
  faucets: "/faucet.png",
  "kitchen-chimneys-range-hoods": "/hood.png",
  "renovation-packages": "/package.png",
};

export async function listProducts(): Promise<ProductRow[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("products")
    .select(
      "id,slug,name,category,description,features,specifications,image_url,collection_slug",
    )
    .order("name", { ascending: true });

  if (error) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("[supabase] listProducts error:", error);
    }
    return [];
  }

  // Map static images
  const products = (data ?? []) as ProductRow[];
  return products.map((prod) => ({
    ...prod,
    image_url: STATIC_IMAGES[prod.slug] ?? prod.image_url,
  }));
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductRow | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("products")
    .select(
      "id,slug,name,category,description,features,specifications,image_url,collection_slug",
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("[supabase] getProductBySlug error:", { slug, error });
    }
    return null;
  }

  const product = data as ProductRow | null;
  if (!product) return null;

  // Map static image
  return {
    ...product,
    image_url: STATIC_IMAGES[product.slug] ?? product.image_url,
  };
}

export async function listProductsByCollectionSlug(
  collectionSlug: string,
): Promise<ProductRow[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("products")
    .select(
      "id,slug,name,category,description,features,specifications,image_url,collection_slug",
    )
    .eq("collection_slug", collectionSlug)
    .order("name", { ascending: true });

  if (error) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("[supabase] listProductsByCollectionSlug error:", {
        collectionSlug,
        error,
      });
    }
    return [];
  }

  // Map static images
  const products = (data ?? []) as ProductRow[];
  return products.map((prod) => ({
    ...prod,
    image_url: STATIC_IMAGES[prod.slug] ?? prod.image_url,
  }));
}
