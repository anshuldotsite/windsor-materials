"use client";

import { useState } from "react";

// Gallery images - add your completed work images here
const galleryImages = [
  {
    id: 1,
    src: "/gallery/project-1.jpg",
    alt: "Modern Kitchen Renovation",
    category: "Kitchen",
    title: "Modern Kitchen with White Cabinets",
  },
  {
    id: 2,
    src: "/gallery/project-2.jpg",
    alt: "Bathroom Vanity Installation",
    category: "Bathroom",
    title: "Floating Vanity Installation",
  },
  {
    id: 3,
    src: "/gallery/project-3.jpg",
    alt: "Custom Closet System",
    category: "Closets",
    title: "Walk-in Closet Organization",
  },
  {
    id: 4,
    src: "/gallery/project-4.jpg",
    alt: "Quartz Countertop",
    category: "Kitchen",
    title: "Premium Quartz Countertop",
  },
  {
    id: 5,
    src: "/gallery/project-5.jpg",
    alt: "Double Sink Vanity",
    category: "Bathroom",
    title: "Double Sink Master Bath",
  },
  {
    id: 6,
    src: "/gallery/project-6.jpg",
    alt: "Kitchen Cabinet Installation",
    category: "Kitchen",
    title: "Shaker Style Cabinets",
  },
];

const categories = ["All", "Kitchen", "Bathroom", "Closets"];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<(typeof galleryImages)[0] | null>(null);

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-[#E3A008]/10 text-[#E3A008] text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
            Our Work
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-[#1F3A5F] mb-4">
            Project Gallery
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-light">
            Browse through our completed projects and see the quality craftsmanship we deliver
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-[#1F3A5F] text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              onClick={() => setLightboxImage(image)}
              className="group relative aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1F3A5F]/20 to-[#E3A008]/10 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <svg
                    className="w-12 h-12 mx-auto mb-2 opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm">Add image</p>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="inline-block px-3 py-1 bg-[#E3A008] text-white text-xs font-medium rounded-full mb-2">
                  {image.category}
                </span>
                <h3 className="text-white text-lg font-medium">{image.title}</h3>
              </div>

              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-5 h-5 text-[#1F3A5F]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No projects found in this category.</p>
          </div>
        )}

        {/* View All CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm mb-4">
            Want to see more of our work?
          </p>
          <a
            href="/custom-orders"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#1F3A5F] text-white font-medium rounded-full hover:bg-[#E3A008] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Start Your Project
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <svg
              className="w-6 h-6 text-white"
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

          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[4/3] bg-gray-800 rounded-2xl overflow-hidden flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg
                  className="w-20 h-20 mx-auto mb-4 opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p>Image: {lightboxImage.src}</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className="inline-block px-3 py-1 bg-[#E3A008] text-white text-xs font-medium rounded-full mb-2">
                {lightboxImage.category}
              </span>
              <h3 className="text-white text-xl font-medium">
                {lightboxImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
