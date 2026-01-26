interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
}

interface ProductGridProps {
  products?: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const defaultProducts: Product[] = [
    { id: 1, name: 'Modern Double Vanity', category: 'Bathroom', price: '$1,299' },
    { id: 2, name: 'Classic Single Vanity', category: 'Bathroom', price: '$899' },
    { id: 3, name: 'Custom Kitchen Island', category: 'Kitchen', price: 'Custom' },
    { id: 4, name: 'Luxury Master Vanity', category: 'Bathroom', price: '$2,499' },
    { id: 5, name: 'Compact Unit', category: 'Bathroom', price: '$649' },
    { id: 6, name: 'Storage Tower', category: 'Storage', price: '$499' },
  ];

  const displayProducts = products || defaultProducts;

  return (
    <section className="flex flex-col py-24 bg-white">
      <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col mb-16 px-2">
          <h2 className="text-4xl font-light text-[#1F3A5F] mb-4">
            Curated Pieces
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {displayProducts.map((product) => (
            <div key={product.id} className="group flex flex-col cursor-pointer">
              <div className="flex aspect-square bg-[#F3F4F6] mb-6 overflow-hidden">
                <div className="flex w-full h-full bg-gray-100 transition-transform duration-700 ease-out group-hover:scale-105">
                  {/* Simulated Image */}
                  <div className="flex w-full h-full bg-gray-50/50"></div>
                </div>
              </div>

              <div className="flex flex-col px-2">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-medium text-[#1F3A5F] group-hover:text-[#E3A008] transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-sm text-[#64748B] font-light">
                    {product.price}
                  </span>
                </div>
                <div className="text-xs text-[#9CA3AF] uppercase tracking-wider">
                  {product.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
