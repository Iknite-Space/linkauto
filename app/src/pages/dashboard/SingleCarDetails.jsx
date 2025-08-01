import React, { useState } from "react";
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

export default function CarDetails() {
  const [showModal, setShowModal] = useState(false);

  const car = {
    name: "Toyota Corolla",
    model: "2022",
    energy_type: "Petrol",
    transmission_type: "Automatic",
    brand: "Toyota",
    no_seats: 5,
    color: "White",
    chasis_no: "ABC1234567890",
    vin: "1HGCM82633A123456",
    price_per_day: 45,
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Car Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DetailItem icon={<Car size={20} />} label="Name" value={car.name} />
        <DetailItem icon={<BadgeInfo size={20} />} label="Model" value={car.model} />
        <DetailItem icon={<Fuel size={20} />} label="Energy Type" value={car.energy_type} />
        <DetailItem icon={<Settings size={20} />} label="Transmission" value={car.transmission_type} />
        <DetailItem icon={<Building2 size={20} />} label="Brand" value={car.brand} />
        <DetailItem icon={<Users size={20} />} label="No. of Seats" value={car.no_seats} />
        <DetailItem icon={<Palette size={20} />} label="Color" value={car.color} />
        <DetailItem icon={<Barcode size={20} />} label="Chassis No." value={car.chasis_no} />
        <DetailItem icon={<Fingerprint size={20} />} label="VIN" value={car.vin} />
        <DetailItem icon={<DollarSign size={20} />} label="Price/Day" value={`$${car.price_per_day}`} />
      </div>

      <div className="mt-10 flex justify-center">
        <Button className="w-64 py-3 text-base" onClick={() => setShowModal(true)}>Reserve</Button>
      </div>

      {showModal && <ReservationFormModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 border p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
      <div className="mt-1 text-blue-600">{icon}</div>
      <div>
        <div className="text-sm font-medium text-gray-600">{label}</div>
        <div className="text-base font-semibold text-gray-800">{value || "N/A"}</div>
      </div>
    </div>
  );
}
