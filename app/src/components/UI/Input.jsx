import PropTypes from "prop-types"

const Input = ({
  type,
  label,
  placeholder,
  option = [],
  value,
  onChange,
  name,
  required = false,
  inputProps

}) => {
  return (
    <div className={`w-full ${type === "hidden" ?"hidden" : "block"}`}>
      {type !== "hidden" && (
        <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red">*</span>}
        </label>
      )}
      {type === "select" ? (
        <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...inputProps}>
          <option value="">-- select {name} --</option>
          {option.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ):(
        type === "radio" ? (
          <div className="flex items-center gap-4">
            {option.map((opt) => (
              <label key={opt.value} className="inline-flex items-center">
                <input
                  type="radio"
                  name={name}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={onChange}
                  className="text-blue-600 form-radio"
                />
                <span className="ml-2">{opt.label}</span>
              </label>
            ))}
          </div>
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...inputProps}
          />
        )
      )}
    </div>
  )
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  option: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  inputProps: PropTypes.object
}

export default Input