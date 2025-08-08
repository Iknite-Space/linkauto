import PropTypes from 'prop-types';
import clsx from 'clsx'; // optional utility for class merging (install via npm if needed)

const Button = ({
  type = 'button',
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  ariaLabel = '',
  children,
}) => {
  const baseClasses =
    'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary focus:ring-primary disabled:bg-blue-300',
    secondary:
      'bg-secondary text-white hover:bg-secondary focus:ring-secondary disabled:bg-gray-100',
    danger:
      'bg-red text-white hover:bg-red focus:ring-red disabled:bg-red',
    outline:
      'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
    green:
      'bg-green text-white hover:bg-green focus:ring-green disabled:bg-green',
    accent:
      'bg-accent text-white hover:bg-accent focus:ring-accent disabled:bg-accent',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      className={clsx(baseClasses, variants[variant], className)}
    >
      {loading ? (
        <svg
          className="w-4 h-4 mr-2 text-current animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger', 'green']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
