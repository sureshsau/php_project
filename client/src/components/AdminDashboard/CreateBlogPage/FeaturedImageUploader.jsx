import React, { useRef } from 'react';

const FeaturedImageUploader = ({ onChange, preview }) => {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) onChange(file);
  };

  return (
    <div className="mb-6">
      <label className="block font-medium mb-2">Featured Image</label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 text-center bg-white">
        {preview ? (
          <img src={preview} alt="Preview" className="w-full max-h-64 object-cover rounded" />
        ) : (
          <>
            <svg
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M4 12l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
            <p>Drag and drop an image here, or</p>
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Browse Files
            </button>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <p className="text-sm text-gray-400 mt-2">
        Recommended size: 1200 x 800 pixels. Max size: 5MB.
      </p>
    </div>
  );
};

export default FeaturedImageUploader;
