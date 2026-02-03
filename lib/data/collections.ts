import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export type CollectionRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  image_url: string | null;
  sort_order: number;
};

// Use importable module path from database (for use with require/import in components)
const getImportableImage = (image_url: string | null) => image_url;

export async function listCollections(): Promise<CollectionRow[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("collections")
    .select("id,slug,name,category,description,image_url,sort_order")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("[supabase] listCollections error:", error);
    }
    return [];
  }

  // Use importable image path from DB
  const collections = (data ?? []) as CollectionRow[];
  return collections.map((col) => ({
    ...col,
    image_url: getImportableImage(col.image_url),
  }));
}

export async function getCollectionBySlug(
  slug: string,
): Promise<CollectionRow | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("collections")
    .select("id,slug,name,category,description,image_url,sort_order")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("[supabase] getCollectionBySlug error:", { slug, error });
    }
    return null;
  }

  const collection = data as CollectionRow | null;
  if (!collection) return null;

  // Use importable image path from DB
  return {
    ...collection,
    image_url: getImportableImage(collection.image_url),
  };
}
