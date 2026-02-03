"use client";

import { useState } from "react";
import Link from "next/link";
import InterestModal from "./InterestModal";

interface ProductSpecs {
  material?: string;
  dimensions?: string;
  finishes?: string[];
  warranty?: string;
  ideal_for?: string[];
}

interface Product {
  slug: string;
  name: string;
  category: string | null;
  description: string | null;
  features: string[];
  specifications: ProductSpecs;
  image_url: string | null;
  collection_slug: string | null;
}

interface ProductPageClientProps {
  product: Product;
}

// Parse dimensions string into structured data
function parseDimensions(dimensions: string | undefined): {
  widths: string[];
  depths: string[];
  heights: string[];
} | null {
  if (!dimensions) return null;

  const result = {
    widths: [] as string[],
    depths: [] as string[],
    heights: [] as string[],
  };

  // Match patterns like "12″ / 15″ / 18″ widths" or "12″ width"
  const widthMatch = dimensions.match(/([\d″\s\/,]+)\s*widths?/i);
  if (widthMatch) {
    result.widths = widthMatch[1]
      .split(/[\/,]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && /\d/.test(s));
  }

  // Match patterns like "12″ depth" or "24″ depths"
  const depthMatch = dimensions.match(/([\d″\s\/,]+)\s*depth/i);
  if (depthMatch) {
    result.depths = depthMatch[1]
      .split(/[\/,]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && /\d/.test(s));
  }

  // Match patterns like "30″ / 36″ / 42″ heights" or "34.5″ height"
  const heightMatch = dimensions.match(/([\d″.\s\/,]+)\s*heights?/i);
  if (heightMatch) {
    result.heights = heightMatch[1]
      .split(/[\/,]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && /\d/.test(s));
  }

  // Only return if we found at least one dimension
  if (result.widths.length > 0 || result.depths.length > 0 || result.heights.length > 0) {
    return result;
  }

  return null;
}

function DimensionSelect({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  const isSingle = options.length <= 1;
  
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
        {label}
      </p>
      <div className="relative">
        <select
          disabled={isSingle}
          className={`w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-[#1F3A5F] font-mono appearance-none outline-none ${
            isSingle ? "bg-gray-100 cursor-not-allowed opacity-75" : "bg-white cursor-pointer"
          }`}
          defaultValue={options[0]}
        >
          {options.length > 0 ? (
            options.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))
          ) : (
            <option>—</option>
          )}
        </select>
        {/* Dropdown arrow icon - only show if not single */}
        {!isSingle && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const specs = (product.specifications ?? {}) as ProductSpecs;
  const parsedDimensions = parseDimensions(specs.dimensions);

  return (
    <>
      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {/* Product Image */}
          <div className="flex items-start justify-center">
            <div className="w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden shadow-sm">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="text-lg font-light">Product Image</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-start pt-4">
            <div className="mb-6">
              <span className="inline-block px-4 py-1.5 bg-gray-100 text-xs font-semibold text-[#1F3A5F] uppercase tracking-widest rounded-full">
                {product.category ?? "Product"}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-light text-[#1F3A5F] mb-6 leading-tight">
              {product.name}
            </h1>

            {/* Description */}
            {product.description && (
              <p className="text-gray-600 font-light text-lg mb-8 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Interested Button */}
            <div className="mb-10">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#E3A008] text-white font-medium rounded-full hover:bg-[#1F3A5F] transition-all shadow-lg shadow-[#E3A008]/20 hover:shadow-xl hover:-translate-y-0.5"
              >
                Interested in this product?
              </button>
            </div>

            {/* Specifications & Features */}
            <div className="mb-10 space-y-8">
              {/* Material */}
              <div className="flex flex-col gap-1">
                <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                  Material
                </h4>
                <p className="text-base text-[#1F3A5F] font-light">
                  {specs.material ?? "—"}
                </p>
              </div>

              {/* Dimensions - Column Layout with Dropdowns */}
              {parsedDimensions ? (
                <div>
                  <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
                    Dimensions
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {/* Width */}
                    <DimensionSelect 
                      label="Width" 
                      options={parsedDimensions.widths} 
                    />

                    {/* Depth */}
                    <DimensionSelect 
                      label="Depth" 
                      options={parsedDimensions.depths} 
                    />

                    {/* Height */}
                    <DimensionSelect 
                      label="Height" 
                      options={parsedDimensions.heights} 
                    />
                  </div>
                </div>
              ) : specs.dimensions ? (
                <div className="flex flex-col gap-1">
                  <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                    Dimensions
                  </h4>
                  <p className="text-base text-[#1F3A5F] font-light">
                    {specs.dimensions}
                  </p>
                </div>
              ) : null}

              {/* Key Features List - 2 Column Grid */}
              <div>
                <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  Key Features
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {(product.features ?? []).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#E3A008] mt-2 shrink-0" />
                      <span className="text-gray-600 font-light text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-20 pt-16 border-t border-gray-100 text-center">
          <h3 className="text-3xl font-light text-[#1F3A5F] mb-6">
            Can't find exactly what you're looking for?
          </h3>
          <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto font-light">
            Contact our team for professional consultation and installation
            services tailored to your needs.
          </p>
          <Link
            href="/custom-orders"
            className="inline-block px-10 py-4 bg-[#E3A008] text-white font-medium hover:bg-[#1F3A5F] transition-all rounded-full shadow-lg shadow-[#E3A008]/20 hover:shadow-xl hover:-translate-y-0.5"
          >
            Get a Custom Quote
          </Link>
        </div>
      </div>

      {/* Interest Modal */}
      <InterestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={{
          slug: product.slug,
          name: product.name,
          category: product.category,
          features: product.features,
          specifications: specs,
        }}
      />
    </>
  );
}
