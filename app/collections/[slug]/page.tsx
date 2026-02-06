import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { getCollectionBySlug } from "@/lib/data/collections";
import { listProductsByCollectionSlug } from "@/lib/data/products";
import Navbar from "@/components/navbar/page";
import Footer from "@/components/footer/page";
import Breadcrumb from "@/components/ui/Breadcrumb";

import kitchenCabinetImg from "@/app/assets/collections/kitchen-cabinets.png";
import quartzCountertopsImg from "@/app/assets/collections/quartz-countertops.png";
import closetsWardrobesImg from "@/app/assets/collections/closets-wardrobes.jpg";
import bathroomVanitiesImg from "@/app/assets/collections/bathroom-vanities.png";
import faucetsImg from "@/app/assets/collections/faucets.jpg";
import rangeHoodsImg from "@/app/assets/collections/kitchen-chimneys-range-hoods.jpg";
import renovationPackagesImg from "@/app/assets/collections/renovation-packages.jpg";
import flooringImg from "@/app/assets/collections/flooring.jpg";
import insulationImg from "@/app/assets/collections/insulation.jpg";

const resolveCollectionImage = (
  imageUrl: string | null,
): StaticImageData | null => {
  if (!imageUrl) return null;
  if (imageUrl.endsWith("kitchen-cabinets.png")) return kitchenCabinetImg;
  if (imageUrl.endsWith("quartz-countertops.png")) return quartzCountertopsImg;
  if (imageUrl.endsWith("closets-wardrobes.jpg")) return closetsWardrobesImg;
  if (imageUrl.endsWith("bathroom-vanities.png")) return bathroomVanitiesImg;
  if (imageUrl.endsWith("faucets.jpg")) return faucetsImg;
  if (imageUrl.endsWith("kitchen-chimneys-range-hoods.jpg"))
    return rangeHoodsImg;
  if (imageUrl.endsWith("renovation-packages.jpg"))
    return renovationPackagesImg;
  if (imageUrl.endsWith("flooring.jpg")) return flooringImg;
  if (imageUrl.endsWith("insulation.jpg")) return insulationImg;
  return null;
};

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  const products = await listProductsByCollectionSlug(slug);

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-light text-[#1F3A5F] mb-4">
            Collection Not Found
          </h1>
          <p className="text-gray-500 mb-8 font-light">
            The collection you're looking for doesn't exist.
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

      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden mt-20">
        {(() => {
          const img = resolveCollectionImage(collection.image_url);
          if (!img) return <div className="w-full h-full bg-gray-100" />;
          return (
            <Image
              src={img}
              alt={collection.name}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          );
        })()}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
              {collection.name}
            </h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90 font-light leading-relaxed">
              {collection.description}
            </p>
          </div>
        </div>
      </div>

      {/* Products in Collection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <div className="mb-12">
          <Breadcrumb
            items={[
              { label: "Collections", href: "/collections" },
              { label: collection.name },
            ]}
          />
        </div>

        <h2 className="text-3xl md:text-4xl font-light text-[#1F3A5F] mb-16 text-center">
          Products
        </h2>

        {products.length === 0 ? (
          <div className="text-gray-500 text-center font-light py-12 bg-gray-50 rounded-2xl">
            No products found for this collection yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group flex flex-col"
              >
                <div className="flex aspect-square bg-gray-50 mb-6 overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex w-full h-full bg-gray-100 transition-transform duration-700 ease-out group-hover:scale-105">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex w-full h-full bg-gray-50 items-center justify-center">
                        <div className="text-gray-300 text-sm">No Image</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col px-2">
                  <h3 className="text-lg font-medium text-[#1F3A5F] group-hover:text-[#E3A008] transition-colors mb-2">
                    {product.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gray-50 rounded-3xl p-12 md:p-24 mt-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-[#1F3A5F] mb-6">
              Can't find exactly what you're looking for?
            </h2>
            <p className="text-gray-500 text-lg mb-10 font-light leading-relaxed">
              Our design team can create a custom solution that perfectly
              matches your vision and the {collection.name} requirements.
            </p>
            <Link
              href="/custom-orders"
              className="inline-block px-10 py-4 bg-[#E3A008] text-white font-medium hover:bg-[#1F3A5F] transition-all rounded-full shadow-lg shadow-[#E3A008]/20 hover:shadow-xl hover:-translate-y-0.5"
            >
              Get a Custom Quote
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
