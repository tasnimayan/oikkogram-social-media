"use client";

import type React from "react";

import { CiImageOn } from "react-icons/ci";

interface ImageUploaderProps {
  previewUrl: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ previewUrl, onChange, onRemove }) => {
  return (
    <div className="space-y-3">
      {previewUrl && (
        <div className="relative group">
          <img
            src={previewUrl || "/placeholder.png"}
            alt="Post preview"
            className="max-h-60 w-full object-contain rounded-lg border p-1"
          />
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-80 hover:opacity-100 transition-opacity"
            aria-label="Remove image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      )}

      <div className="relative flex justify-end">
        <div className="flex items-center gap-2 border rounded-full px-3 py-1.5 hover:bg-gray-50 transition cursor-pointer">
          <span className="text-sm font-medium text-gray-700">Add Image</span>
          <span className="flex items-center justify-center bg-blue-100 w-7 h-7 rounded-full text-blue-600">
            <CiImageOn className="w-4 h-4" />
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={onChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
