"use client";

import { useState, useCallback } from "react";
import ImageUpload from "@/components/ui/ImageUpload";

interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image_url: string | null;
  sort_order: number;
}

interface ContactFormProps {
  collections: Collection[];
}

export default function ContactForm({ collections }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    product: "",
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          attachments,
          formType: "custom-order",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setSubmitStatus("success");
      setSubmitMessage("Thank you! Your message has been sent successfully.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        product: "",
        message: "",
      });
      setFiles([]);

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("Failed to send message. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto py-8">
      {/* Name */}
      <div className="group">
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2 ml-1"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-0 py-3 bg-transparent border-b border-gray-200 focus:border-[#243b64] focus:outline-none transition-all placeholder-gray-300 text-[#243b64] font-light text-lg"
          placeholder="Your full name"
        />
      </div>

      {/* Phone Number & Email Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Phone Number */}
        <div className="group">
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2 ml-1"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-0 py-3 bg-transparent border-b border-gray-200 focus:border-[#243b64] focus:outline-none transition-all placeholder-gray-300 text-[#243b64] font-light text-lg"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        {/* Email */}
        <div className="group">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2 ml-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-0 py-3 bg-transparent border-b border-gray-200 focus:border-[#243b64] focus:outline-none transition-all placeholder-gray-300 text-[#243b64] font-light text-lg"
            placeholder="your@email.com"
          />
        </div>
      </div>

      {/* Product Collection */}
      <div className="group">
        <label
          htmlFor="product"
          className="block text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2 ml-1"
        >
          Collection of Interest
        </label>
        <div className="relative">
          <select
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            required
            className="w-full px-0 py-3 bg-transparent border-b border-gray-200 focus:border-[#243b64] focus:outline-none transition-all text-[#243b64] font-light text-lg appearance-none cursor-pointer"
          >
            <option value="" className="text-gray-400">
              Select a collection
            </option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.name}>
                {collection.name}
              </option>
            ))}
          </select>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
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

      {/* Message */}
      <div className="group">
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2 ml-1"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-0 py-3 bg-transparent border-b border-gray-200 focus:border-[#243b64] focus:outline-none transition-all placeholder-gray-300 text-[#243b64] font-light text-lg resize-none"
          placeholder="Tell us about your custom order requirements..."
        />
      </div>

      {/* Image Upload */}
      <div className="group">
        <label className="block text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4 ml-1">
          Upload Rough Designs (Optional)
        </label>
        <ImageUpload
          onFilesChange={handleFilesChange}
          maxFiles={2}
          maxSizeMB={15}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-12 py-3 bg-[#243b64] text-white font-medium hover:bg-[#dda01e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          {isSubmitting ? "Sending..." : "Submit Inquiry"}
        </button>
      </div>

      {/* Status Message */}
      {submitStatus === "success" && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
          {submitMessage}
        </div>
      )}
      {submitStatus === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {submitMessage}
        </div>
      )}
    </form>
  );
}
