import React from 'react'
import Hero from '../components/About/component/Hero'
import Value from '../components/About/component/Values'
import ProfessionSection from '../components/About/component/ProfessionSection'
import AboutUs from '../components/About/component/Aboutus'



function About() {
  return (
    <div className='mt-15 flex flex-col'>
      <Hero/>
      <AboutUs/>
      <ProfessionSection/>
      <Value/>
  
   
   
    </div>
  )
}

export default About