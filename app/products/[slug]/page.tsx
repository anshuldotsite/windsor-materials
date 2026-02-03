import Link from "next/link";
import { getProductBySlug } from "@/lib/data/products";
import Navbar from "@/components/navbar/page";
import Footer from "@/components/footer/page";
import ProductPageClient from "@/components/product/ProductPageClient";

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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
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
