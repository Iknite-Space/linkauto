import { useState } from "react";
import ReactPaginate from "react-paginate";
import { cars } from "../../utils/menuItems";
import { MdPeopleAlt } from "react-icons/md";
import { TbManualGearboxFilled } from "react-icons/tb";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { IoLogoModelS } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

function CarListing() {
  const [hoveredId, setHoveredId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 8;
  const pageCount = Math.ceil(cars.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setHoveredId(null);
  };

  const offset = currentPage * itemsPerPage;
  const currentCars = cars.slice(offset, offset + itemsPerPage);

  return (

    <section className="px-10 py-16 mt-16 lg:mx-auto">
      <h2 className="text-3xl text-primary font-bold mb-8 text-center">
        Book a car and Unleash Your Adventure!
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {currentCars.map((car) => {
          const isHovered = hoveredId === car.id;
          const image = isHovered ? car.images.back : car.images.front;

          return (
            <motion.div
              key={car.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              onMouseEnter={() => setHoveredId(car.id)}
              onMouseLeave={() => setHoveredId(null)}
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
                    className="absolute w-full h-48 object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                </AnimatePresence>
              </div>
   
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold text-primary">
                  {car.name}
                </h3>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <TbManualGearboxFilled className="text-primary" />
                    Transmission: {car.transmission}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MdPeopleAlt className="text-primary" />
                    Seats: {car.no_seats}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <BsFillFuelPumpDieselFill className="text-primary" />
                    Energy: {car.energy_type}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <IoLogoModelS className="text-primary" />
                    Brand: {car.brand}
                  </div>
                </div>
                <div className="flex justify-end items-center">
                  <p className="text-primary font-bold rounded-full shadow-md px-3 py-1 ">
                    XAF <span className="text-xl">{car.pricePerDay}</span>/day
                  </p>
                </div>
                <button className="mt-3 w-full bg-primary text-white py-2 rounded-md hover:bg-secondary transition-colors">
                  View Details
                </button>


              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
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
