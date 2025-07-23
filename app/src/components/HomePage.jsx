import React from 'react'
import ComingSoon from './ComingSoon'
import HeroSection from './HeroSection'

const HomePage = () => {
  return (
    <>
    <div id='hero-section'><HeroSection /></div>
    <div className='my-4' id='hero'><ComingSoon /></div>
    </>
  )
}

export default HomePage