import React, { useState } from "react";
import PropTypes from "prop-types";

export default function FileInput({
  name,
  label,
  value,
  onChange,
  error,
  isRequired = false,
  multiple = false,
}) {
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);

    onChange(files); // Pass array of files
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block mb-1 text-sm font-medium">
          {label} {isRequired && <span className="text-red">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />

      {previews.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {previews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Preview ${index + 1}`}
              className="object-cover w-24 h-24 border rounded-md"
            />
          ))}
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
}

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.object,
  multiple: PropTypes.bool,
};
