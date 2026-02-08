import React, { useRef } from "react";

interface ImageUploaderProps {
  onUpload: (file: File) => void;
  loading: boolean;
  imagePreview: string | null;
}

export default function ImageUploader({
  onUpload,
  loading,
  imagePreview,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (JPEG or PNG)");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    onUpload(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please drop a valid image file (JPEG or PNG)");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }
    onUpload(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClick = () => {
    if (!loading && !imagePreview) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <input
        id="mammogram-upload"
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        onChange={handleFileSelect}
        disabled={loading}
        className="hidden"
      />
      {imagePreview ? (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden bg-gray-50 border border-gray-100 aspect-[4/3] max-h-[320px]">
            <img
              src={imagePreview}
              alt="Uploaded mammogram"
              className="w-full h-full object-contain"
            />
            {loading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-gray-600 text-sm font-medium">Processing…</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
            >
              Choose another file
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`
            relative flex flex-col items-center justify-center rounded-xl
            border-2 border-dashed transition-all duration-200 cursor-pointer
            min-h-[320px] p-8
            ${
              loading
                ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                : "border-sky-200 bg-sky-50/30 hover:border-sky-300 hover:bg-sky-50/50"
            }
          `}
        >
          {/* Choose file button - top left */}
          <div
            className="absolute top-4 left-4 flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <label
              htmlFor="mammogram-upload"
              className="cursor-pointer"
            >
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm">
                Choose file
              </span>
            </label>
            <span className="ml-2 text-sm text-gray-400">No file chosen</span>
          </div>

          {/* Large folder icon */}
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="w-24 h-24 mb-4 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-full h-full text-amber-400 drop-shadow-sm"
                fill="currentColor"
              >
                <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z" />
              </svg>
            </div>
            <p className="text-gray-700 font-medium text-lg mb-2">
              Click or Drag image to upload
            </p>
            <p className="text-sky-600 text-sm">JPEG / PNG • Max 10MB</p>
          </div>

          {loading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-2" />
                <p className="text-gray-600 text-sm font-medium">Processing…</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
