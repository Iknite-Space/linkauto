import React from "react";
import HeroSection from "./HeroSection";
import WhyChooseUs from "./WhyChooseUs";
import AboutUs from "./AboutUs";
import Faq from "./Faq";

const HomePage = () => {
  return (
    <>
      <div id="hero-section">
        <HeroSection />
      </div>
      <div id="about-us" className="my-4">
        <AboutUs />
      </div>
      <div className="my-4">
        <WhyChooseUs />
      </div>
      <div className="my-4" id="FAQ">
        <Faq />
      </div>
    </>
  );
};

export default HomePage;
