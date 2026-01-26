import Link from 'next/link';
import Image from 'next/image';

interface Collection {
  title: string;
  description: string;
  image: string;
  slug: string;
}

export default function FeaturedCollections() {
  const collections: Collection[] = [
    {
      title: 'Modern Collection',
      description: 'Clean lines and contemporary aesthetics define our modern vanity collection. Perfect for minimalist spaces seeking elegance.',
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2070&auto=format&fit=crop',
      slug: 'modern'
    },
    {
      title: 'Classic Collection',
      description: 'Timeless designs that never go out of style. Our classic collection brings sophistication to any bathroom.',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
      slug: 'classic'
    },
    {
      title: 'Luxury Collection',
      description: 'Premium materials and exquisite craftsmanship. Experience the pinnacle of vanity design with our luxury line.',
      image: 'https://images.unsplash.com/photo-1620626012084-5fc1673f88b5?q=80&w=2070&auto=format&fit=crop',
      slug: 'luxury'
    }
  ];

  return (
    <section className="flex flex-col py-32 bg-white">
      <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-[#243b64] mb-4">
            Featured Collections
          </h2>
        </div>

        <div className="flex flex-col gap-32">
          {collections.map((collection, index) => (
            <div key={collection.slug} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
              {/* Image */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} h-[500px] bg-gray-100 overflow-hidden`}>
                <Image
                  src={collection.image}
                  alt={collection.title}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className={`flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <h3 className="text-3xl md:text-4xl font-light text-[#243b64] mb-6">
                  {collection.title}
                </h3>
                <p className="text-[#64748B] leading-relaxed mb-8 text-lg font-light">
                  {collection.description}
                </p>
                <Link
                  href={`/collections/${collection.slug}`}
                  className="text-[#243b64] hover:text-[#dda01e] transition-colors font-medium text-base border-b-2 border-[#243b64] hover:border-[#dda01e] pb-1 w-fit"
                >
                  View Collection →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
