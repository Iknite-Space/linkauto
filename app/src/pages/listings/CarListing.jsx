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
      <section className="px-10 py-16 mt-16 lg:mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center text-primary">
          Book a car and Unleash Your Adventure!{" "}
        </h2>
        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cars.map((car) => (
            <div
              key={car.id}
              className="overflow-hidden transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg"
            >
              <img
                src={car.image}
                alt={car.name}
                className="object-cover w-full h-48"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold text-primary">
                  {car.name}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <span className="text-primary">
                        {" "}
                        <TbManualGearboxFilled />
                      </span>
                       {car.transmission}
                    </div>
                  </p>
                  <p className="text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <span className="text-primary">
                        {" "}
                        <MdPeopleAlt />
                      </span>
                       {car.no_seats}
                    </div>
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <span className="text-primary">
                        {" "}
                        <BsFillFuelPumpDieselFill />
                      </span>
                       {car.energy_type}
                    </div>
                  </p>
                  <p className="text-sm font-bold text-gray-500">
                    <div className="flex items-center gap-1">
                      <span className="text-primary">
                        {" "}
                        <IoLogoModelS />
                      </span>
                       {car.brand}
                    </div>
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <button className="p-2 text-sm text-white rounded-full btn bg-primary">View Details</button>
                  <p className="text-sm text-secondary">XAF 100,000 /DAY</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default CarListing;
