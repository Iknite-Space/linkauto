
import React from "react";
import HeroSection from "./HeroSection";
import WhyChooseUs from "./WhyChooseUs";
import AboutUs from "./AboutUs";
import Faq from "./Faq";


import CallToAction from './CallToAction'
import Testimonials from './Testimonials'



const HomePage = () => {
  return (
    <>

    <div id='home'><HeroSection /></div>
    <div id="about-us" className="my-4 px-7"><AboutUs /></div>
    <div id='why-choose-us' className="my-4 px-7"><WhyChooseUs /></div>
    <div id='call-to-action' ><CallToAction /></div>
    <div id='testimonials' className="my-4 px-7"><Testimonials /></div>
      <div  id="FAQ" className ="my-4 px-7">
        <Faq />
      </div>

    </>
  );
};

export default HomePage;
