import Link from "next/link";
import { getProductBySlug } from "@/lib/data/products";
import { getCollectionBySlug } from "@/lib/data/collections";
import Navbar from "@/components/navbar/page";
import Footer from "@/components/footer/page";
import ProductPageClient from "@/components/product/ProductPageClient";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-light text-[#1F3A5F] mb-4">
            Product Not Found
          </h1>
          <p className="text-[#64748B] mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Link
            href="/collections"
            className="inline-block px-8 py-3 bg-[#1F3A5F] text-white hover:bg-[#E3A008] transition-colors rounded-full font-medium"
          >
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  // Get collection info for breadcrumb
  const collection = product.collection_slug
    ? await getCollectionBySlug(product.collection_slug)
    : null;

  // Build breadcrumb items
  const breadcrumbItems = [{ label: "Collections", href: "/collections" }];

  if (collection) {
    breadcrumbItems.push({
      label: collection.name,
      href: `/collections/${collection.slug}`,
    });
  }

  breadcrumbItems.push({ label: product.name });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-2">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <ProductPageClient
        product={{
          slug: product.slug,
          name: product.name,
          category: product.category,
          description: product.description,
          features: product.features,
          specifications: product.specifications as {
            material?: string;
            dimensions?: string;
            finishes?: string[];
            warranty?: string;
            ideal_for?: string[];
          },
          image_url: product.image_url,
          collection_slug: product.collection_slug,
        }}
      />
      <Footer />
    </div>
  );
}
