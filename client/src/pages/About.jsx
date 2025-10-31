import React from 'react'
import Hero from '../components/About/Hero'
import Value from '../components/About/Values'
import ProfessionSection from '../components/About/ProfessionSection'
import AboutUs from '../components/About/Aboutus'



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