import React, { useState } from 'react';

const CarDetail = ({ car }) => {
  const [sameLocation, setSameLocation] = useState(true);

  // Fallback car for testing/demo if car is not passed
  const fallbackCar = {
    name: 'Toyota Corolla',
    brand: 'Toyota',
    model: 'LE',
    color: 'Silver',
    price_per_day: 15000,
    date_of_first_use: '2019-05-10',
    transmission_type: 'Automatic',
    energy_type: 'Petrol',
    no_seats: 5,
    vin: '1HGCM82633A123456',
    chassis_no: 'JH4KA8260MC012345',
    date_added: '2024-07-20',
    status: 'Available',
    image: '/images/toyota-corolla.jpg', // image from public/images/
  };

  const carData = car || fallbackCar;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Car Image */}
        <div className="relative">
          <img
            src={carData.image}
            alt={carData.name}
            className="w-full h-96 object-cover rounded-2xl shadow"
          />
          <span className={`absolute top-4 right-4 px-3 py-1 text-sm font-semibold rounded-full ${
            carData.status === 'Available'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {carData.status}
          </span>
        </div>

        {/* Car Info */}
        <div>
          <h1 className="text-3xl font-bold">{carData.name}</h1>
          <p className="text-gray-600 text-lg mt-2">
            {carData.brand} • {carData.model} • {carData.color}
          </p>
          <p className="text-blue-600 text-2xl font-semibold mt-4">
            ₦{carData.price_per_day.toLocaleString()} / day
          </p>
          <p className="text-gray-500 mt-2">First Used: {carData.date_of_first_use}</p>

          <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
            <p><strong>Transmission:</strong> {carData.transmission_type}</p>
            <p><strong>Energy:</strong> {carData.energy_type}</p>
            <p><strong>Seats:</strong> {carData.no_seats}</p>
            <p><strong>VIN:</strong> {carData.vin}</p>
            <p><strong>Chassis No:</strong> {carData.chassis_no}</p>
            <p><strong>Date Added:</strong> {new Date(carData.date_added).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="mt-12 bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-6">Book This Car</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pickup Info */}
          <div>
            <label className="block mb-1 font-medium">Pickup Location</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Enter pickup location"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Pickup Date</label>
            <input
              type="date"
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Pickup Time</label>
            <input
              type="time"
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>

          {/* Drop-off Info */}
          {!sameLocation && (
            <div>
              <label className="block mb-1 font-medium">Drop-off Location</label>
              <input
                type="text"
                className="w-full border px-4 py-2 rounded-lg"
                placeholder="Enter drop-off location"
              />
            </div>
          )}

          <div>
            <label className="block mb-1 font-medium">Drop-off Date</label>
            <input
              type="date"
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Drop-off Time</label>
            <input
              type="time"
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>

          {/* Same location checkbox */}
          <div className="md:col-span-2">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-blue-600"
                checked={sameLocation}
                onChange={(e) => setSameLocation(e.target.checked)}
              />
              <span>Drop off at same location</span>
            </label>
          </div>

          {/* Submit button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Reserve Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarDetail;
