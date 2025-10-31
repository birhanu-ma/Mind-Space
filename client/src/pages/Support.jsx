import React from 'react';
import Hero from '../components/support/Hero';
import OurServices from '../components/support/OurServices';
import ServiceSection from '../components/support/ServiceSection';

function Support() {
  return (
    <div className="mt-15 text-center">
      <Hero />
      <OurServices />
      <ServiceSection />
    </div>
  );
}

export default Support;
