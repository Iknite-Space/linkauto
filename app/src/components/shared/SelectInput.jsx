// components/SelectInput.jsx
import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

export default function SelectInput({
  name,
  control,
  options,
  placeholder,
  error,
  className = "",
}) {
  return (
    <div className={`w-full ${className}`}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            placeholder={placeholder}
            value={options.find(option => option.value === field.value)}
            onChange={(option) => field.onChange(option?.value)}
          />
        )}
      />
      {error && <p className="mt-1 text-sm text-red">{error.message}</p>}
    </div>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.object,
  className: PropTypes.string,
};