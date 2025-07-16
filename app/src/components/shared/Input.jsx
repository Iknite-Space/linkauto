import React from "react";
import PropTypes from "prop-types";

export default function Input({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
  className = "",
}) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md ${className}`}
      />
      {error && <p className="text-red text-sm mt-1">{error.message}</p>}
    </div>
  );
}

Input.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  error: PropTypes.object,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
}