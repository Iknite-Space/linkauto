import React from 'react'
import HeroSection from './HeroSection'
import WhyChooseUs from './WhyChooseUs'
import AboutUs from './AboutUs'
import CallToAction from './CallToAction'
import Testimonials from './Testimonials'


const HomePage = () => {
  return (
    <>
    <div id='hero-section'><HeroSection /></div>
    <div id="about-us" className="my-4 px-7"><AboutUs /></div>
    <div className="my-4 px-7"><WhyChooseUs /></div>
    <div id='call-to-action' ><CallToAction /></div>
    <div id='testimonials' className="my-4 px-7"><Testimonials /></div>
    </>
  )
}

export default HomePage