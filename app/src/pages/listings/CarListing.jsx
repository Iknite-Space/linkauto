import { cars } from "../../utils/menuItems";
import { useState } from "react";
import { MdPeopleAlt } from "react-icons/md";
import { TbManualGearboxFilled } from "react-icons/tb";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { IoLogoModelS } from "react-icons/io";
import { MdCurrencyFranc } from "react-icons/md";

function CarListing() {
  return (
    <>
      <section className="px-10 py-16 mt-16  lg:mx-auto">
        <h2 className="text-3xl text-primary font-bold mb-8 text-center">
          Book a car and Unleash Your Adventure!{" "}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold text-primary">
                  {car.name}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <span className="text-primary">
                        {" "}
                        <TbManualGearboxFilled />
                      </span>
                      Transmission: {car.transmission}
                    </div>
                  </p>
                  <p className="text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <span className="text-primary">
                        {" "}
                        <MdPeopleAlt />
                      </span>
                      Seats: {car.no_seats}
                    </div>
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <span className="text-primary">
                        {" "}
                        <BsFillFuelPumpDieselFill />
                      </span>
                      Energy Type: {car.energy_type}
                    </div>
                  </p>
                  <p className="text-sm font-bold text-gray-500">
                    <div className="flex items-center gap-1">
                      <span className="text-primary">
                        {" "}
                        <IoLogoModelS />
                      </span>
                      Brand: {car.brand}
                    </div>
                  </p>
                </div>
                <div className="flex justify-end items-center">
                  <p className="text-primary font-bold rounded-full shadow-md px-3 py-1 ">
                    XAF <span className="text-xl">{car.pricePerDay} </span>
                    /day
                  </p>
                </div>

                <button className="mt-3 w-full bg-primary text-white py-2 rounded-md hover:bg-secondary transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default CarListing;
