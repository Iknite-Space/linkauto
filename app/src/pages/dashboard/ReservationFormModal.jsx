import React from "react";
import PropTypes from "prop-types"; // 👈 import PropTypes

export default function ReservationFormModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Reserve Car</h2>
        <form className="grid grid-cols-1 gap-4">
          {/* Form Fields */}
          <div>
            <label className="block text-sm font-medium">Pickup Location</label>
            <input type="text" className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Dropoff Location</label>
            <input type="text" className="w-full border p-2 rounded" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium">Start Date</label>
              <input type="date" className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Pickup Time</label>
              <input type="time" className="w-full border p-2 rounded" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium">End Date</label>
              <input type="date" className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Dropoff Time</label>
              <input type="time" className="w-full border p-2 rounded" />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-red text-backgroundColor px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green text-backgroundColor text-sm px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

ReservationFormModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
