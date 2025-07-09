import PropTypes from 'prop-types';
const ErrorFallback = ({error, resetErrorBoundary}) => {
  return (
    <div role="alert" className="text-center text-red-600">
        <p>Something went wrong:</p>
        <pre className="text-sm">{error.message}</pre>
        {/* You will make use of your custom button component here later */}
        <button onClick={resetErrorBoundary} className="mt-2 text-blue-600 underline">
            Try again
        </button>
    </div>
  )
}

ErrorFallback.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};

export default ErrorFallback