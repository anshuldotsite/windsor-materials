"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import InterestModal from "./InterestModal";
import oneDrawerCabinetImg from "@/app/assets/products/cabinets/1DrawerCabinet.png";
import twoDrawerCabinetImg from "@/app/assets/products/cabinets/2DrawerCabinet.png";
import threeDrawerCabinetImg from "@/app/assets/products/cabinets/3DrawerCabinet.png";
import fullDoorCabinetImg from "@/app/assets/products/cabinets/fulldoorcabinet.png";
import garbageBinsImg from "@/app/assets/products/cabinets/garbageBins.png";
import lazySusanImg from "@/app/assets/products/cabinets/lazySusan.jpg";
import peanutShapeImg from "@/app/assets/products/cabinets/peanutShape.webp";
import sinkCabinetImg from "@/app/assets/products/cabinets/sinkcabinet.jpg";
import spiceRackImg from "@/app/assets/products/cabinets/spiceRack.webp";
import swingTraysImg from "@/app/assets/products/cabinets/swingTrays.webp";
import quartzEssentialOne from "@/app/assets/products/quartz/essential-series/one.jpg";
import quartzEssentialTwo from "@/app/assets/products/quartz/essential-series/2.webp";
import quartzEssentialThree from "@/app/assets/products/quartz/essential-series/3.webp";
import quartzEssentialFour from "@/app/assets/products/quartz/essential-series/4.webp";
import quartzEssentialFive from "@/app/assets/products/quartz/essential-series/5.webp";

interface ProductSpecs {
  material?: string;
  dimensions?: string | Record<string, unknown>;
  finishes?: string[];
  warranty?: string;
  ideal_for?: string[];
  image_gallery?: string[];
  cabinet_types?: {
    corner_cabinets?: {
      description?: string;
      options?: Array<{ name: string; description: string }>;
    };
    drawer_cabinets?: {
      description?: string;
      options?: Array<{ name: string; description: string }>;
    };
    full_door_cabinets?: {
      description?: string;
      options?: Array<{ name: string; description: string }>;
    };
    sink_base_cabinets?: {
      description?: string;
      options?: Array<{ name: string; description: string }>;
    };
  };
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

const CABINET_GALLERY_DEFAULT = [
  "app/assets/products/cabinets/1DrawerCabinet.png",
  "app/assets/products/cabinets/2DrawerCabinet.png",
  "app/assets/products/cabinets/3DrawerCabinet.png",
  "app/assets/products/cabinets/fulldoorcabinet.png",
  "app/assets/products/cabinets/garbageBins.png",
  "app/assets/products/cabinets/lazySusan.jpg",
  "app/assets/products/cabinets/peanutShape.webp",
  "app/assets/products/cabinets/sinkcabinet.jpg",
  "app/assets/products/cabinets/spiceRack.webp",
  "app/assets/products/cabinets/swingTrays.webp",
];

const CABINET_OPTION_IMAGE_MAP: Record<string, string> = {
  "Lazy Susan": "lazySusan.jpg",
  "Spice Rack": "spiceRack.webp",
  "Garbage Bins": "garbageBins.png",
  "Swing Trays": "swingTrays.webp",
  "Peanut Shape": "peanutShape.webp",
  "1 Drawer Cabinet": "1DrawerCabinet.png",
  "2 Drawer Cabinet": "2DrawerCabinet.png",
  "3 Drawer Cabinet": "3DrawerCabinet.png",
  "Single Door": "fulldoorcabinet.png",
  "Double Door": "fulldoorcabinet.png",
  "Standard Sink Base": "sinkcabinet.jpg",
  "Farmhouse Sink Base": "sinkcabinet.jpg",
  "Corner Sink Base": "sinkcabinet.jpg",
};

function resolveProductImage(imageUrl: string | null): StaticImageData | null {
  if (!imageUrl) return null;
  if (imageUrl.endsWith("1DrawerCabinet.png")) return oneDrawerCabinetImg;
  if (imageUrl.endsWith("2DrawerCabinet.png")) return twoDrawerCabinetImg;
  if (imageUrl.endsWith("3DrawerCabinet.png")) return threeDrawerCabinetImg;
  if (imageUrl.endsWith("fulldoorcabinet.png")) return fullDoorCabinetImg;
  if (imageUrl.endsWith("garbageBins.png")) return garbageBinsImg;
  if (imageUrl.endsWith("lazySusan.jpg")) return lazySusanImg;
  if (imageUrl.endsWith("peanutShape.webp")) return peanutShapeImg;
  if (imageUrl.endsWith("sinkcabinet.jpg")) return sinkCabinetImg;
  if (imageUrl.endsWith("spiceRack.webp")) return spiceRackImg;
  if (imageUrl.endsWith("swingTrays.webp")) return swingTraysImg;
  // Quartz essential series images
  if (imageUrl.endsWith("one.jpg") || imageUrl.endsWith("one.JPG"))
    return quartzEssentialOne;
  if (imageUrl.endsWith("2.webp")) return quartzEssentialTwo;
  if (imageUrl.endsWith("3.webp")) return quartzEssentialThree;
  if (imageUrl.endsWith("4.webp")) return quartzEssentialFour;
  if (imageUrl.endsWith("5.webp")) return quartzEssentialFive;
  return null;
}

// Parse dimensions string or object into structured data
function parseDimensions(
  dimensions: string | Record<string, unknown> | undefined,
): {
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

  // Handle object format (from JSONB specifications)
  if (typeof dimensions === "object" && !Array.isArray(dimensions)) {
    const dims = dimensions as Record<string, string>;

    // Extract widths from object (e.g., base_widths, widths, etc.)
    if (dims.base_widths || dims.widths) {
      const widthStr = (dims.base_widths || dims.widths) as string;
      result.widths = widthStr
        .split(/[\/,]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0 && /\d/.test(s));
    }

    // Extract depths from object (e.g., base_depth, depth, etc.)
    if (dims.base_depth || dims.depth) {
      const depthStr = (dims.base_depth || dims.depth) as string;
      // Extract just the number part (e.g., "24″ standard" -> "24″")
      const depthMatch = depthStr.match(/([\d″.]+)/);
      if (depthMatch) {
        result.depths = [depthMatch[1]];
      } else {
        result.depths = depthStr
          .split(/[\/,]/)
          .map((s) => s.trim())
          .filter((s) => s.length > 0 && /\d/.test(s));
      }
    }

    // Extract heights from object (e.g., base_height, height, etc.)
    if (dims.base_height || dims.height) {
      const heightStr = (dims.base_height || dims.height) as string;
      // Extract just the number part (e.g., "34.5″ standard" -> "34.5″")
      const heightMatch = heightStr.match(/([\d″.]+)/);
      if (heightMatch) {
        result.heights = [heightMatch[1]];
      } else {
        result.heights = heightStr
          .split(/[\/,]/)
          .map((s) => s.trim())
          .filter((s) => s.length > 0 && /\d/.test(s));
      }
    }

    // Only return if we found at least one dimension
    if (
      result.widths.length > 0 ||
      result.depths.length > 0 ||
      result.heights.length > 0
    ) {
      return result;
    }

    return null;
  }

  // Handle string format (original logic)
  if (typeof dimensions !== "string") return null;

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
  if (
    result.widths.length > 0 ||
    result.depths.length > 0 ||
    result.heights.length > 0
  ) {
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
            isSingle
              ? "bg-gray-100 cursor-not-allowed opacity-75"
              : "bg-white cursor-pointer"
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

// Cabinet Type Selector Component
function CabinetTypeSelector({
  cabinetTypes,
  onOptionChange,
  onTypeChange,
}: {
  cabinetTypes: ProductSpecs["cabinet_types"];
  onOptionChange?: (optionName: string) => void;
  onTypeChange?: (typeName: string) => void;
}) {
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  if (!cabinetTypes) return null;

  const cabinetTypeOptions = [
    { key: "corner_cabinets", label: "Corner Cabinets" },
    { key: "drawer_cabinets", label: "Drawer Cabinets" },
    { key: "full_door_cabinets", label: "Full Door Cabinets" },
    { key: "sink_base_cabinets", label: "Sink Base Cabinets" },
  ].filter(({ key }) => cabinetTypes[key as keyof typeof cabinetTypes]);

  const selectedTypeData = selectedType
    ? cabinetTypes[selectedType as keyof typeof cabinetTypes]
    : null;

  return (
    <div className="space-y-4">
      <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
        Select Cabinet Type
      </h4>

      {/* Main Cabinet Type Dropdown */}
      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Cabinet Type *
        </label>
        <div className="relative">
          <select
            value={selectedType}
            onChange={(e) => {
              const next = e.target.value;
              setSelectedType(next);
              setSelectedOption(""); // Reset sub-option when type changes
              if (onTypeChange) onTypeChange(next);
            }}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#1F3A5F] focus:ring-1 focus:ring-[#1F3A5F] outline-none transition-all text-[#1F3A5F] appearance-none cursor-pointer bg-white"
          >
            <option value="">Choose a cabinet type</option>
            {cabinetTypeOptions.map(({ key, label }) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Sub-option Dropdown (shown when type is selected) */}
      {selectedTypeData &&
        selectedTypeData.options &&
        selectedTypeData.options.length > 0 && (
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {selectedTypeData.description || "Select Option"} *
            </label>
            <div className="relative">
              <select
                value={selectedOption}
                onChange={(e) => {
                  const next = e.target.value;
                  setSelectedOption(next);
                  if (onOptionChange) onOptionChange(next);
                }}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#1F3A5F] focus:ring-1 focus:ring-[#1F3A5F] outline-none transition-all text-[#1F3A5F] appearance-none cursor-pointer bg-white"
              >
                <option value="">Choose an option</option>
                {selectedTypeData.options.map((option, index) => (
                  <option key={index} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {selectedOption && (
              <p className="mt-2 text-sm text-gray-600 font-light">
                {
                  selectedTypeData.options.find(
                    (opt) => opt.name === selectedOption,
                  )?.description
                }
              </p>
            )}
          </div>
        )}
    </div>
  );
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const specs = (product.specifications ?? {}) as ProductSpecs;
  const parsedDimensions = parseDimensions(specs.dimensions);

  const galleryUrls = useMemo(() => {
    if (product.slug === "cabinets") {
      const gallery = Array.isArray(specs.image_gallery)
        ? specs.image_gallery
        : CABINET_GALLERY_DEFAULT;
      return gallery.length > 0 ? gallery : CABINET_GALLERY_DEFAULT;
    }
    return product.image_url ? [product.image_url] : [];
  }, [product.image_url, product.slug, specs.image_gallery]);

  const galleryImages = useMemo(() => {
    return galleryUrls
      .map((url) => ({ url, img: resolveProductImage(url) }))
      .filter((entry) => entry.url);
  }, [galleryUrls]);

  useEffect(() => {
    if (galleryImages.length <= 1 || isCarouselPaused) return;
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [galleryImages.length, isCarouselPaused]);

  useEffect(() => {
    if (activeImageIndex >= galleryImages.length) {
      setActiveImageIndex(0);
    }
  }, [activeImageIndex, galleryImages.length]);

  return (
    <>
      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {/* Product Image */}
          <div className="flex items-start justify-center">
            <div className="w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden shadow-sm">
              {galleryImages.length > 0 ? (
                (() => {
                  const current =
                    galleryImages[activeImageIndex] ?? galleryImages[0];
                  if (current?.img) {
                    return (
                      <Image
                        src={current.img}
                        alt={product.name}
                        width={900}
                        height={900}
                        className="w-full h-full object-cover"
                        priority
                      />
                    );
                  }
                  return current?.url ? (
                    <img
                      src={current.url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : null;
                })()
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

              {/* Cabinet Type Selector (for cabinets product) */}
              {product.slug === "cabinets" && specs.cabinet_types && (
                <CabinetTypeSelector
                  cabinetTypes={specs.cabinet_types}
                  onTypeChange={() => {
                    setIsCarouselPaused(true);
                  }}
                  onOptionChange={(optionName) => {
                    setIsCarouselPaused(true);
                    const filename = CABINET_OPTION_IMAGE_MAP[optionName];
                    if (!filename) return;
                    const idx = galleryImages.findIndex((entry) =>
                      entry.url.endsWith(filename),
                    );
                    if (idx >= 0) setActiveImageIndex(idx);
                  }}
                />
              )}

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
              ) : specs.dimensions && typeof specs.dimensions === "string" ? (
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
