import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-colors duration-300 hover:bg-gray-50">
      {console.log(`this is service image url http://localhost:5000/img/services/${service.image}`)}
      {/* Image Section */}
      <div className="h-48 overflow-hidden relative">
        <img
          src={
                service?.image
                  ? `http://localhost:5000/img/services/${service.image}`
                  : "https://i.pravatar.cc/40"
              }
          alt={service.header}
          className="w-full h-full object-cover"
        />
        {/* Optional subtle overlay for professional look */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{service.header}</h3>
        <p className="text-gray-600 mb-6">{service.paragraph}</p>

        {/* Action Button */}
       <Link 
  to={service.buttonText === "Book a session" ? "/support/appointment/1" : "#"} 
  onClick={scrollToTop}
>
  <button className="w-full bg-black text-white py-3 rounded-md font-medium shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-1 transition-colors duration-300">
    {service.buttonText === "Book a session" ? "Book a session" : "Learn More"}
  </button>
</Link>

      </div>
    </div>
  );
};

export default ServiceCard;
