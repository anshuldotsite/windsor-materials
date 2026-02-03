import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { listCollections } from "@/lib/data/collections";

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

export default async function Collections() {
  const collections = await listCollections();

  return (
    <section className="flex flex-col py-32 bg-white">
      <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 px-2">
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl md:text-5xl font-light text-[#1F3A5F]">
              Collections
            </h2>
            <p className="text-gray-500 font-light text-lg max-w-lg">
              Explore our curated selection of premium materials and designs for
              every room in your home.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {collections.map((collection, index) => (
            <Link
              key={index}
              href={`/collections/${collection.slug}`}
              className="group flex flex-col"
            >
              <div className="flex overflow-hidden aspect-4/5 bg-gray-50 mb-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-500">
                <div className="flex w-full h-full bg-gray-100 transition-transform duration-1000 ease-out group-hover:scale-105">
                  {(() => {
                    const img = resolveCollectionImage(collection.image_url);
                    if (!img) return null;
                    return (
                      <Image
                        src={img}
                        alt={collection.name}
                        width={800}
                        height={1000}
                        className="w-full h-full object-cover transition-all duration-500"
                      />
                    );
                  })()}
                </div>
              </div>

              <div className="flex justify-between items-center px-2">
                <h3 className="text-xl font-light text-[#1F3A5F] group-hover:text-[#E3A008] transition-colors duration-300">
                  {collection.name}
                </h3>
                <span className="text-[#E3A008] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
