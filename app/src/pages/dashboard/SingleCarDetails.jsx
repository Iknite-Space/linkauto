import React, { useState } from "react";
import PropTypes from "prop-types"; 
import { useUser } from "../../hooks/UseAuth";

import {
  Car,
  BadgeInfo,
  Fuel,
  Settings,
  Building2,
  Users,
  Palette,
  Barcode,
  Fingerprint,
  DollarSign,
} from "lucide-react";
import Button from "../../components/UI/Button";
import ReservationFormModal from "./ReservationFormModal";

export default function CarDetails({ cardetails = {} }) {
  const { currentUser = null, loading = true } = useUser() || {};
CarDetails.propTypes = {
  cardetails: PropTypes.object.isRequired,
};
  const [showModal, setShowModal] = useState(false);
  const status = cardetails?.status;

  // const car = {
  //   name: "Toyota Corolla",
  //   model: "2022",
  //   energy_type: "Petrol",
  //   transmission_type: "Automatic",
  //   brand: "Toyota",
  //   no_seats: 5,
  //   color: "White",
  //   chasis_no: "ABC1234567890",
  //   vin: "1HGCM82633A123456",
  //   price_per_day: 45,
  // };

  return (
    <div className="w-full max-w-5xl p-6 mx-auto bg-white shadow-md rounded-xl">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">Car Details</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DetailItem icon={<Car size={20} />} label="Name" value={cardetails.name} />
        <DetailItem icon={<BadgeInfo size={20} />} label="Model" value={cardetails.model} />
        <DetailItem icon={<Fuel size={20} />} label="Energy Type" value={cardetails.energy_type} />
        <DetailItem icon={<Settings size={20} />} label="Transmission" value={cardetails.transmission_type} />
        <DetailItem icon={<Building2 size={20} />} label="Brand" value={cardetails.brand} />
        <DetailItem icon={<Users size={20} />} label="No. of Seats" value={cardetails.no_seats} />
        <DetailItem icon={<Palette size={20} />} label="Color" value={cardetails.color} />
        <DetailItem icon={<Barcode size={20} />} label="Chassis No." value={cardetails.chassis_no} />
        <DetailItem icon={<Fingerprint size={20} />} label="VIN" value={cardetails.vin} />
        <DetailItem icon={<DollarSign size={20} />} label="Price/Day" value={`$${cardetails.price_per_day}`} />
        <DetailItem icon={<Car size={20} />} label="Pickup Location" value={cardetails.pickup_location} />
        <DetailItem icon={<BadgeInfo size={20} />} label="Dropoff Location" value={cardetails.dropoff_location} />
      </div>
      {/** grey out the reservation button when the status is pending */}
      <div className="flex justify-center mt-10">
        <Button
          className={`w-64 py-3 text-base ${status === "completed" ? "bg-gray-400 cursor-not-allowed" : ""}`}
          onClick={() => status !== "completed" && setShowModal(true)}
          disabled={status === "completed"}
          title={status === "completed" ? "Reservation not available" : "Reserve this car"}
        >
          Reserve
        </Button>
      </div>

      {showModal && <ReservationFormModal pricePerDay={cardetails.price_per_day} carId={cardetails.uuid} onClose={() => setShowModal(false)} />}
    </div>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 p-3 transition border rounded-lg bg-gray-50 hover:bg-gray-100">
      <div className="mt-1 text-blue-600">{icon}</div>
      <div>
        <div className="text-sm font-medium text-gray-600">{label}</div>
        <div className="text-base font-semibold text-gray-800">{value || "N/A"}</div>
      </div>
    </div>
  );
}


DetailItem.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]).isRequired,
  cardetails: PropTypes.object.isRequired,

};
