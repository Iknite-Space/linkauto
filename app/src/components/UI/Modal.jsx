import { useEffect } from 'react';
import PropTypes from 'prop-types';
import React, { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../shared/ErrorBoundary';

const Loading = lazy(() => import("../shared/Loading"));
const Button = lazy(() => import('./Button'));

const Modal = ({ isOpen, btnx= true, btn = true, onClose, title, children }) => {
  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-gray-100 rounded-lg shadow-lg w-[90%] max-w-md mx-auto animate-fade-in-up">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {btnx && (<button
            onClick={onClose}
            className="text-gray-500 hover:text-red focus:outline-none"
            aria-label="Close modal"
            title='close modal'
          >
            ✕
          </button>)}
        </div>

        <div className="p-4 text-gray-700">{children}</div>

        <div className="flex justify-end gap-2 p-4 border-t">
            {btn && (<ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Loading />}>
                    <Button ariaLabel='close' variant="danger" onClick={onClose}>
                        Cancel
                    </Button>
                </Suspense>
            </ErrorBoundary>)}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  btn: PropTypes.bool,
  btnx: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Modal;
