import React from 'react';
import Hero from '../component/hero.jsx';
 import SupportSection from '../component/SupportSection.jsx';
import InfoSection from '../component/InfoSection.jsx';
import Testimonials from '../component/Testimonials.jsx';
import FinalSection from '../component/FinalSection.jsx';
export default function HomeSection() {
  return (
  <>
  <Hero/>
  <InfoSection/>
  <SupportSection/>
  <Testimonials/>
  <FinalSection/>
  </>
  )
}