import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/UseAuth";
import PropTypes from "prop-types";

export default function ReservationFormModal({ onClose, pricePerDay,carId }) {
  const navigate = useNavigate();
  const { currentUser = null, loading = true } = useUser() || {};

  if(!loading && !currentUser?.uuid){
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-center text-red-600">
          Opps You are not signed in
        </h2>
        <p className="mb-6 text-center text-gray-700">
          You need to be logged in to make a reservation.  
          Please sign in to continue.
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white rounded bg-red hover:bg-red">
            Close
          </button>
          <Link
            to="/login"
            className="px-4 py-2 text-white rounded bg-primary hover:bg-green-700"
          >
            Sign In
          </Link>
        </div>
      </div>
      </div>
    )
  }

  const [amount, setAmount] = useState(0);
  const [formData, setFormData] = useState({
    car_uuid: carId,
    customer_uuid: currentUser?.uuid || 0,
    start_date: '',
    end_date: '',
    pickup_time: '',
    dropoff_time: '',
    rental_amount: 0
  });

  const calculateAmount = (start, end) => {
    if (!start || !end) return 0;
    const startDateObj = new Date(start);
    const  endDateObj = new Date(end);
    const days = Math.ceil(( endDateObj - startDateObj) / (1000 * 60 * 60 * 24));
    return days > 0 ? days * pricePerDay : pricePerDay;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevData => {
      const updatedData = { ...prevData, [name]: value };

      // If startDate or  end_date changes, recalculate rental amount
      if (name === "start_date" || name === "end_date") {
        const newAmount = calculateAmount(updatedData.start_date, updatedData.end_date);
        setAmount(newAmount);
        updatedData. rental_amount = newAmount;
      }

      return updatedData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDateObj = new Date(formData.start_date);
    const  endDateObj = new Date(formData.end_date);

    if (startDateObj < today) {
      alert("Start date cannot be in the past");
      return;
    }

    if ( endDateObj < startDateObj) {
      alert("End date cannot be before start date");
      return;
    }
    // Store in localStorage as string
    localStorage.setItem('reservationData', JSON.stringify(formData));
    // Navigate to payment page
    navigate("/payment");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Reserve Car</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">

          {/* Dates and Times */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium">Start Date</label>
              <input type="date" className="w-full p-2 border rounded"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required />
            </div>
            <div>
              <label className="block text-sm font-medium">Pickup Time</label>
              <input type="time" className="w-full p-2 border rounded"
                name="pickup_time"
                value={formData.pickup_time}
                onChange={handleChange}
                required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium">End Date</label>
              <input type="date" className="w-full p-2 border rounded"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required />
            </div>
            <div>
              <label className="block text-sm font-medium">Dropoff Time</label>
              <input type="time" className="w-full p-2 border rounded"
                name="dropoff_time"
                value={formData.dropoff_time}
                onChange={handleChange}
                required />
            </div>
          </div>

          {/* Rental Amount */}
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Rental Amount (FCFA)</label>
            <input
              className="w-full p-2 border rounded"
              type="number"
              value={amount}
              disabled
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-red text-backgroundColor"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-sm rounded text-backgroundColor ${
                currentUser?.uuid
                  ? "bg-primary cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!currentUser?.uuid}
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

ReservationFormModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  pricePerDay: PropTypes.number.isRequired,
  carId: PropTypes.string.isRequired
};
