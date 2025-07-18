// FileInput.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";

export default function FileInput({ name, label, value, onChange, error }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    onChange([file]); // pass array for Zod
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-2 max-h-40 border rounded-md object-contain"
        />
      )}
      {error && <p className="text-red text-sm mt-1">{error.message}</p>}
    </div>
  );
}

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.object,
};
