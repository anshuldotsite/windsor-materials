import Link from 'next/link';

interface Collection {
  name: string;
  slug: string;
  image?: string;
}

export default function Collections() {
  const collections: Collection[] = [
    { name: 'Classic', slug: 'classic', image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Modern', slug: 'modern', image: 'https://images.unsplash.com/photo-1620626012761-d93740868f6a?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Transitional', slug: 'transitional' },
    { name: 'Farmhouse', slug: 'farmhouse' },
    { name: 'Contemporary', slug: 'contemporary' },
    { name: 'Traditional', slug: 'traditional' },
    { name: 'Minimalist', slug: 'minimalist' },
    { name: 'Luxury', slug: 'luxury' },
  ];

  return (
    <section className="flex flex-col py-24 bg-white">
      <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-2">
          <h2 className="text-4xl font-light text-[#1F3A5F]">
             Collections
          </h2>
          <Link href="/products" className="hidden md:block text-sm text-[#9CA3AF] hover:text-[#1F3A5F] transition-colors uppercase tracking-widest">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
          {collections.map((collection, index) => (
            <Link
              key={index}
              href={`/products/${collection.slug}`}
              className="group flex flex-col"
            >
              <div className="flex overflow-hidden aspect-4/5 bg-[#F3F4F6] mb-6">
                <div className="flex w-full h-full bg-gray-200 transition-transform duration-1000 ease-out group-hover:scale-105">
                  {collection.image && (
                    <img src={collection.image} alt={collection.name} className="w-full h-full object-cover grayscale-10 group-hover:grayscale-0 transition-all duration-500" />
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center px-2">
                <h3 className="text-lg font-medium text-[#1F3A5F] group-hover:text-[#E3A008] transition-colors duration-300">
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
