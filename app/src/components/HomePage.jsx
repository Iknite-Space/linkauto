import React from 'react'
import ComingSoon from './ComingSoon'
import WhyChooseUs from './WhyChooseUs'

const HomePage = () => {
  return (
    <>
        <div className='my-4' id='hero'><ComingSoon /></div>
        <div className="my-4"><WhyChooseUs /></div>
    </>
  )
}

export default HomePage