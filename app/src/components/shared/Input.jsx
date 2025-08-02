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
  isRequired = false
}) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block mb-1 text-sm font-medium">
          {label} {isRequired && (<span className='text-red'>*</span>)}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red">{error.message}</p>}
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
  isRequired: PropTypes.bool,
  className: PropTypes.string,
}