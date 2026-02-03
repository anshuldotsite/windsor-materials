"use client";

import { useState, useRef, useCallback } from "react";

interface ImageUploadProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
}

export default function ImageUpload({
  onFilesChange,
  maxFiles = 2,
  maxSizeMB = 15,
}: ImageUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const validateAndAddFiles = useCallback(
    (newFiles: FileList | File[]) => {
      setError(null);
      const fileArray = Array.from(newFiles);

      // Check file count
      if (files.length + fileArray.length > maxFiles) {
        setError(`Maximum ${maxFiles} images allowed`);
        return;
      }

      const validFiles: File[] = [];
      const newPreviews: string[] = [];

      for (const file of fileArray) {
        // Check if it's an image
        if (!file.type.startsWith("image/")) {
          setError(`"${file.name}" is not an image file`);
          continue;
        }

        // Check file size
        if (file.size > maxSizeBytes) {
          setError(`"${file.name}" exceeds ${maxSizeMB}MB limit`);
          continue;
        }

        validFiles.push(file);
        newPreviews.push(URL.createObjectURL(file));
      }

      if (validFiles.length > 0) {
        const updatedFiles = [...files, ...validFiles];
        const updatedPreviews = [...previews, ...newPreviews];
        setFiles(updatedFiles);
        setPreviews(updatedPreviews);
        onFilesChange(updatedFiles);
      }
    },
    [files, previews, maxFiles, maxSizeBytes, maxSizeMB, onFilesChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files) {
        validateAndAddFiles(e.dataTransfer.files);
      }
    },
    [validateAndAddFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      validateAndAddFiles(e.target.files);
    }
    // Reset input so same file can be selected again
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    onFilesChange(updatedFiles);
    setError(null);
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
          ${
            isDragging
              ? "border-[#E3A008] bg-[#E3A008]/5"
              : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
          }
          ${files.length >= maxFiles ? "opacity-50 pointer-events-none" : ""}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          disabled={files.length >= maxFiles}
        />

        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-[#1F3A5F]">
              {isDragging ? "Drop images here" : "Click or drag images to upload"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPG, GIF, WebP, HEIC up to {maxSizeMB}MB each ({maxFiles} max)
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}

      {/* Preview Grid */}
      {previews.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative group w-20 h-20 rounded-lg overflow-hidden border border-gray-200"
            >
              <img
                src={preview}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 text-white"
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
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] px-1 py-0.5 truncate">
                {files[index]?.name}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* File count indicator */}
      <p className="text-xs text-gray-400 text-right">
        {files.length}/{maxFiles} images uploaded
      </p>
    </div>
  );
}
