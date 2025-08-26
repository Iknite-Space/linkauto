import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { MdPeopleAlt } from "react-icons/md";
import { TbManualGearboxFilled } from "react-icons/tb";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { IoLogoModelS } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

import api from "../../services/axios";
import { Link } from "react-router-dom";

function CarListing() {
  const [hoveredId, setHoveredId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [cars, setCars] = useState([]);

  const itemsPerPage = 8;
  const pageCount = Math.ceil(cars?.length || 0 / itemsPerPage);

  useEffect(() => {
    const carListings = async () => {
      try {
        const res = await api.get("/carlistings");
        if (res.data.success) {
          setCars(res.data.cars);
        }
      } catch (error) {
        console.error("An unexpected error occured", error());
      }
    };
    carListings();
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setHoveredId(null);
  };

  const offset = currentPage * itemsPerPage;
  const currentCars = cars.slice(offset, offset + itemsPerPage);
  if (!Array.isArray(cars) || cars.length === 0) {
    return <p className="text-center text-red-500">** No car Listed yet **</p>;
  }  

  return (
    <section className="px-10 py-16 mt-16 lg:mx-auto">
      <h2 className="mb-8 text-3xl font-bold text-center text-primary">
        Book a car and Unleash Your Adventure!
      </h2>

      {/* Sort / Filter Bar */}
      <div
        className="flex items-center gap-0 mb-8 overflow-hidden overflow-x-auto border rounded-full shadow-sm lg:w-max no-scrollbar scrollbar-track-primary"
      >
        {/* Brand */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white border-r">
          <IoLogoModelS className="text-gray-500" />
          <span className="font-medium text-blue-600">Brand</span>
          <select className="ml-2 bg-transparent outline-none ">
            <option value="">All</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Mercedes">Mercedes</option>
            <option value="BMW">BMW</option>
            <option value="Nissan">Nissan</option>
          </select>
        </div>

        {/* Number of Seats */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white border-r">
          <MdPeopleAlt className="text-gray-500" />
          <span className="font-medium text-blue-600">Seats</span>
          <select className="ml-2 bg-transparent outline-none">
            <option value="">Any</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="7">7</option>
          </select>
        </div>

        {/* Energy Type */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white border-r">
          <BsFillFuelPumpDieselFill className="text-gray-500" />
          <span className="font-medium text-blue-600">Energy</span>
          <select className="ml-2 bg-transparent outline-none">
            <option value="">All</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Transmission */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white border-r">
          <TbManualGearboxFilled className="text-gray-500" />
          <span className="font-medium text-blue-600">Transmission</span>
          <select className="ml-2 bg-transparent outline-none">
            <option value="">All</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        {/* Cancel Button */}
        <button className="flex items-center gap-2 px-4 py-2 text-white bg-primary hover:bg-blue-900">
          <span>Cancel</span>
        </button>
      </div>

      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {currentCars.map((car) => {
          const isHovered = hoveredId === car.id;
          const image = isHovered ? car.images[1] : car.images[0];

          return (
            <Link to={`/carlisting/car/${car.id}`} key={car.id}>
              <motion.div
                key={car.id}
                className="overflow-hidden transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                {" "}
                <div className="relative w-full h-48 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={image}
                      src={image}
                      alt={car.name}
                      className="absolute object-cover w-full h-48"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      onMouseEnter={() => setHoveredId(car.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    />
                  </AnimatePresence>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-semibold capitalize text-primary">
                    {car.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500 ">
                      <TbManualGearboxFilled className="capitalize text-primary" />
                      Transmission: {car.transmission}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 ">
                      <MdPeopleAlt className="capitalize text-primary" />
                      Seats: {car.no_seats}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <BsFillFuelPumpDieselFill className="capitalize text-primary" />
                      Energy: {car.energy_type}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <IoLogoModelS className="capitalize text-primary" />
                      Brand: {car.brand}
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <p className="px-3 py-1 font-bold rounded-full shadow-md text-primary ">
                      XAF <span className="text-xl">{car.pricePerDay}</span>/day
                    </p>
                  </div>
                  <button className="w-full py-2 mt-3 text-white transition-colors rounded-md bg-primary hover:bg-secondary">
                    View Details
                  </button>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-center mt-10">
        <ReactPaginate
          previousLabel={"← Prev"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"flex gap-2"}
          previousClassName={"px-3 py-1 border rounded-md"}
          nextClassName={"px-3 py-1 border rounded-md"}
          pageClassName={"px-3 py-1 border rounded-md"}
          activeClassName={"bg-primary text-white"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      </div>
    </section>
  );
}

export default CarListing;
