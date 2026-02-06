"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import ImageUpload from "@/components/ui/ImageUpload";

interface ProductSpecs {
  material?: string;
  dimensions?: string | Record<string, unknown>;
  finishes?: string[];
  warranty?: string;
  ideal_for?: string[];
}

interface Product {
  slug: string;
  name: string;
  category: string | null;
  features: string[];
  specifications: ProductSpecs;
}

interface InterestModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

interface ParsedDimensions {
  widths: string[];
  depths: string[];
  heights: string[];
}

// Parse dimensions string or object into structured data
function parseDimensions(dimensions: string | Record<string, unknown> | undefined): ParsedDimensions | null {
  if (!dimensions) return null;

  const result: ParsedDimensions = {
    widths: [],
    depths: [],
    heights: [],
  };

  // Handle object format (from JSONB specifications)
  if (typeof dimensions === 'object' && !Array.isArray(dimensions)) {
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
    if (result.widths.length > 0 || result.depths.length > 0 || result.heights.length > 0) {
      return result;
    }
    
    return null;
  }

  // Handle string format (original logic)
  if (typeof dimensions !== 'string') return null;

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

// Extract sizes from product features (for products like vanities)
function extractSizesFromFeatures(features: string[]): string[] | null {
  for (const feature of features) {
    const sizesMatch = feature.match(
      /^(?:Sizes|Standard widths|Standard sizes):\s*(.+)$/i
    );
    if (sizesMatch) {
      const sizes = sizesMatch[1]
        .split(/[\/,]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      if (sizes.length > 0) {
        return sizes;
      }
    }
  }
  return null;
}

// Extract materials from product specifications
function extractMaterials(specs: ProductSpecs): string[] | null {
  if (specs.material) {
    const materials = specs.material
      .split(/\s*\/\s*/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && s.length < 30);
    if (materials.length > 1) {
      return materials;
    }
  }
  return null;
}

// Dropdown select component
function SelectDropdown({
  id,
  name,
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  disabled = false,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
      >
        {label} {required && "*"}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required && !disabled}
          disabled={disabled}
          className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#1F3A5F] focus:ring-1 focus:ring-[#1F3A5F] outline-none transition-all text-[#1F3A5F] appearance-none ${
            disabled
              ? "bg-gray-100 cursor-not-allowed opacity-75"
              : "bg-white cursor-pointer"
          }`}
        >
          {!disabled && <option value="">{placeholder}</option>}
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {!disabled && (
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
        )}
      </div>
    </div>
  );
}

export default function InterestModal({
  isOpen,
  onClose,
  product,
}: InterestModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    width: "",
    height: "",
    depth: "",
    size: "",
    material: "",
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const hasInitializedDimensions = useRef(false);

  // Parse dimensions from specifications (memoized to prevent recalculation)
  const parsedDimensions = useMemo(
    () => parseDimensions(product.specifications?.dimensions),
    [product.specifications?.dimensions]
  );
  
  // Check if we have multiple options for each dimension (memoized)
  const hasMultipleWidths = useMemo(
    () => parsedDimensions && parsedDimensions.widths.length > 1,
    [parsedDimensions]
  );
  const hasMultipleHeights = useMemo(
    () => parsedDimensions && parsedDimensions.heights.length > 1,
    [parsedDimensions]
  );
  const hasMultipleDepths = useMemo(
    () => parsedDimensions && parsedDimensions.depths.length > 1,
    [parsedDimensions]
  );
  const hasDimensionDropdowns = useMemo(
    () => parsedDimensions && (parsedDimensions.widths.length > 0 || parsedDimensions.heights.length > 0 || parsedDimensions.depths.length > 0),
    [parsedDimensions]
  );

  // Extract sizes from features (for vanities etc.) (memoized)
  const sizesFromFeatures = useMemo(
    () => extractSizesFromFeatures(product.features),
    [product.features]
  );
  const hasFeatureSizes = useMemo(
    () => sizesFromFeatures && sizesFromFeatures.length > 0 && !hasDimensionDropdowns,
    [sizesFromFeatures, hasDimensionDropdowns]
  );

  // Extract materials from product specifications (memoized)
  const availableMaterials = useMemo(
    () => extractMaterials(product.specifications),
    [product.specifications]
  );
  const hasMaterials = useMemo(
    () => availableMaterials && availableMaterials.length > 0,
    [availableMaterials]
  );

  // Initialize single values only once when modal opens
  useEffect(() => {
    if (isOpen && parsedDimensions && !hasInitializedDimensions.current) {
      hasInitializedDimensions.current = true;
      setFormData(prev => ({
        ...prev,
        width: !hasMultipleWidths && parsedDimensions.widths.length === 1 ? parsedDimensions.widths[0] : "",
        height: !hasMultipleHeights && parsedDimensions.heights.length === 1 ? parsedDimensions.heights[0] : "",
        depth: !hasMultipleDepths && parsedDimensions.depths.length === 1 ? parsedDimensions.depths[0] : "",
      }));
    }
    
    // Reset the flag when modal closes
    if (!isOpen) {
      hasInitializedDimensions.current = false;
    }
  }, [isOpen, parsedDimensions, hasMultipleWidths, hasMultipleHeights, hasMultipleDepths]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilesChange = useCallback((newFiles: File[]) => {
    setFiles(newFiles);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Convert files to base64
      const filePromises = files.map(
        (file) =>
          new Promise<{ name: string; type: string; data: string }>(
            (resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                const base64 = (reader.result as string).split(",")[1];
                resolve({
                  name: file.name,
                  type: file.type,
                  data: base64,
                });
              };
              reader.onerror = reject;
              reader.readAsDataURL(file);
            }
          )
      );

      const attachments = await Promise.all(filePromises);

      // Build size/dimensions string
      let sizeInfo = "";
      if (hasDimensionDropdowns) {
        const parts = [];
        if (formData.width) parts.push(`Width: ${formData.width}`);
        if (formData.height) parts.push(`Height: ${formData.height}`);
        if (formData.depth) parts.push(`Depth: ${formData.depth}`);
        sizeInfo = parts.join(", ");
      } else if (hasFeatureSizes && formData.size) {
        sizeInfo = formData.size;
      } else {
        const dimensions = product.specifications?.dimensions;
        if (typeof dimensions === "string") {
          sizeInfo = dimensions;
        } else if (dimensions && typeof dimensions === "object") {
          const parsed = parseDimensions(dimensions);
          if (parsed) {
            const parts = [] as string[];
            if (parsed.widths.length > 0) {
              parts.push(`Width: ${parsed.widths.join(" / ")}`);
            }
            if (parsed.depths.length > 0) {
              parts.push(`Depth: ${parsed.depths.join(" / ")}`);
            }
            if (parsed.heights.length > 0) {
              parts.push(`Height: ${parsed.heights.join(" / ")}`);
            }
            sizeInfo = parts.length > 0 ? parts.join(", ") : "N/A";
          } else {
            sizeInfo = "N/A";
          }
        } else {
          sizeInfo = "N/A";
        }
      }

      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          product: product.name,
          size: sizeInfo,
          material: hasMaterials ? formData.material : product.specifications?.material || "N/A",
          message: formData.message || "No additional message",
          attachments,
          formType: "product-interest",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to send");
      }

      setSubmitStatus("success");
      setSubmitMessage("Thank you! We'll get back to you shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        width: "",
        height: "",
        depth: "",
        size: "",
        material: "",
        message: "",
      });
      setFiles([]);

      // Close modal after success
      setTimeout(() => {
        onClose();
        setSubmitStatus("idle");
      }, 2000);
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
        >
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <h2 className="text-2xl font-light text-[#1F3A5F]">Interested in this product?</h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill out the form and we'll get back to you
          </p>
        </div>

        {/* Product Info */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            Product
          </p>
          <p className="text-[#1F3A5F] font-medium">{product.name}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="modal-name"
              className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
            >
              Name *
            </label>
            <input
              type="text"
              id="modal-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#1F3A5F] focus:ring-1 focus:ring-[#1F3A5F] outline-none transition-all text-[#1F3A5F]"
              placeholder="Your full name"
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="modal-email"
                className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="modal-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#1F3A5F] focus:ring-1 focus:ring-[#1F3A5F] outline-none transition-all text-[#1F3A5F]"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label
                htmlFor="modal-phone"
                className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
              >
                Phone *
              </label>
              <input
                type="tel"
                id="modal-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#1F3A5F] focus:ring-1 focus:ring-[#1F3A5F] outline-none transition-all text-[#1F3A5F]"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          {/* Dimension Dropdowns - Width, Height, Depth in columns */}
          {hasDimensionDropdowns && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Select Dimensions
              </p>
              <div className="grid grid-cols-3 gap-3">
                {/* Width */}
                <SelectDropdown
                  id="modal-width"
                  name="width"
                  label="Width"
                  value={formData.width}
                  onChange={handleChange}
                  options={parsedDimensions!.widths}
                  placeholder="Select"
                  required
                  disabled={!hasMultipleWidths}
                />

                {/* Depth */}
                <SelectDropdown
                  id="modal-depth"
                  name="depth"
                  label="Depth"
                  value={formData.depth}
                  onChange={handleChange}
                  options={parsedDimensions!.depths}
                  placeholder="Select"
                  required
                  disabled={!hasMultipleDepths}
                />

                {/* Height */}
                <SelectDropdown
                  id="modal-height"
                  name="height"
                  label="Height"
                  value={formData.height}
                  onChange={handleChange}
                  options={parsedDimensions!.heights}
                  placeholder="Select"
                  required
                  disabled={!hasMultipleHeights}
                />
              </div>
            </div>
          )}

          {/* Size dropdown for products with feature sizes (vanities etc.) */}
          {hasFeatureSizes && (
            <SelectDropdown
              id="modal-size"
              name="size"
              label="Select Size"
              value={formData.size}
              onChange={handleChange}
              options={sizesFromFeatures!}
              placeholder="Choose a size"
              required
            />
          )}

          {/* Material Dropdown */}
          {hasMaterials && (hasDimensionDropdowns || hasFeatureSizes) && (
            <SelectDropdown
              id="modal-material"
              name="material"
              label="Select Material"
              value={formData.material}
              onChange={handleChange}
              options={availableMaterials!}
              placeholder="Choose a material"
              required
            />
          )}

          {/* Message */}
          <div>
            <label
              htmlFor="modal-message"
              className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
            >
              Additional Details (Optional)
            </label>
            <textarea
              id="modal-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#1F3A5F] focus:ring-1 focus:ring-[#1F3A5F] outline-none transition-all text-[#1F3A5F] resize-none"
              placeholder="Any specific requirements or questions..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Upload Rough Designs (Optional)
            </label>
            <ImageUpload
              onFilesChange={handleFilesChange}
              maxFiles={2}
              maxSizeMB={15}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-[#E3A008] text-white font-medium rounded-lg hover:bg-[#1F3A5F] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#E3A008]/20 hover:shadow-xl"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending...
              </span>
            ) : (
              "Submit Interest"
            )}
          </button>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-center">
              {submitMessage}
            </div>
          )}
          {submitStatus === "error" && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
              {submitMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
