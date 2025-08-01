
import React, { useRef, useState } from "react";
import "../../App.css";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const images = ["/assets/carousel1.png","/assets/testimonial1.png","/assets/car1.png","/assets/car2.png","/assets/testimonial5.png","/assets/testimonial4.png","/assets/testimonial5.png","/assets/testimonial6.png","/assets/car1-herosection.png","/assets/testimonial4.png","/assets/car3.png"];

export default function CarCarousel() {
  const [mainIndex, setMainIndex] = useState(0);
  const sideScrollRef = useRef(null);

  const scrollSide = (direction) => {
    if (sideScrollRef.current) {
      const scrollAmount = 100;
      sideScrollRef.current.scrollBy({
        top: direction === "up" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const goToNext = () => {
    setMainIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setMainIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-6xl items-start gap-4">
        {/* Side Carousel with Arrows */}
        <div className="flex flex-col items-center rounded bg-white p-2 shadow-md">
          <button
            onClick={() => scrollSide("up")}
            className="mb-2 rounded bg-gray-200 p-1 hover:bg-gray-300"
          >
            <ChevronUp />
          </button>

          <div
            className="hide-scrollbar flex h-[400px] flex-col items-center gap-2 overflow-y-auto"
            ref={sideScrollRef}
          >
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setMainIndex(idx)}
                onMouseEnter={() => setMainIndex(idx)} // Here is the onmouse effect
                className={`h-20 w-20 cursor-pointer rounded object-cover border-2 transition duration-200 ${
                  mainIndex === idx
                    ? "border-blue-500 ring-2 ring-blue-300"
                    : "border-transparent"
                }`}
                alt={`Thumbnail ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => scrollSide("down")}
            className="mt-2 rounded bg-gray-200 p-1 hover:bg-gray-300"
          >
            <ChevronDown />
          </button>
        </div>

        {/* Main Display with Left/Right Controls */}
        <div className="relative flex-1 overflow-hidden rounded shadow-lg">
          <img
            src={images[mainIndex]}
            alt="Main"
            className="h-[500px] w-full object-contain rounded"
          />

          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}


