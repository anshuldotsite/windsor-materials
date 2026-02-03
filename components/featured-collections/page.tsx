import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { listCollections } from "@/lib/data/collections";

import kitchenCabinetImg from "@/app/assets/collections/kitchen-cabinets.png";
import quartzCountertopsImg from "@/app/assets/collections/quartz-countertops.png";
import closetsWardrobesImg from "@/app/assets/collections/closets-wardrobes.jpg";

const resolveCollectionImage = (
  imageUrl: string | null,
): StaticImageData | null => {
  if (!imageUrl) return null;

  // DB stores importable module paths like: app/assets/collections/kitchen-cabinet.png
  if (imageUrl.endsWith("kitchen-cabinets.png")) return kitchenCabinetImg;
  if (imageUrl.endsWith("quartz-countertops.png")) return quartzCountertopsImg;
  if (imageUrl.endsWith("closets-wardrobes.jpg")) return closetsWardrobesImg;
  return null;
};

export default async function FeaturedCollections() {
  const all = await listCollections();
  const collections = all.slice(0, 3);

  return (
    <section className="flex flex-col py-32 bg-white">
      <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-[#1F3A5F] mb-6">
            Featured Collections
          </h2>
          <p className="text-gray-500 font-light text-lg max-w-xl">
            Discover our most popular designs, crafted to elevate your space
            with timeless elegance and modern functionality.
          </p>
        </div>

        <div className="flex flex-col gap-32">
          {collections.map((collection, index) => (
            <div
              key={collection.slug}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
            >
              {/* Image */}
              <div
                className={`${index % 2 === 1 ? "lg:col-start-2" : ""} h-125 bg-gray-50 overflow-hidden rounded-3xl shadow-sm`}
              >
                {(() => {
                  const img = resolveCollectionImage(collection.image_url);
                  if (!img) return null;
                  return (
                    <Image
                      src={img}
                      alt={collection.name}
                      width={800}
                      height={500}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                      priority={index === 0}
                    />
                  );
                })()}
              </div>

              {/* Content */}
              <div
                className={`flex flex-col justify-center ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}
              >
                <span className="text-[#E3A008] text-sm font-medium tracking-widest uppercase mb-4">
                  {collection.category ?? "Collection"}
                </span>
                <h3 className="text-3xl md:text-4xl font-light text-[#1F3A5F] mb-6 leading-tight">
                  {collection.name}
                </h3>
                <p className="text-gray-500 leading-relaxed mb-10 text-lg font-light">
                  {collection.description}
                </p>
                <Link
                  href={`/collections/${collection.slug}`}
                  className="inline-flex items-center text-[#1F3A5F] hover:text-[#E3A008] transition-colors font-medium text-base group"
                >
                  View Collection
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
