import React from 'react';
import ServiceCard from './ServiceCard';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { serviceAPI } from '../../service/client';
import Spinner from '../ui/Spinner';

const ServiceSection = () => {




    const [serviceType, setServiceType] = useState("internal");
  const [query, setQuery] = useState({
    q: "",
    sort: "header",
    page: 1,
    limit: 10,
  });
  const {
    data: service,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["service", serviceType, query],
    queryFn: async () => {
      if (serviceType === "All") {
        return await serviceAPI.getAllServices(query);
      } else {
        return await serviceAPI.getServicesByType({ serviceType, ...query });
      }
    },
    keepPreviousData: true,
    retry: false,
  });

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">Failed to load Services.</p>
    );
  const Services = service?.data;
  

  console.log("service list", Services);
  if (Services.length == 0) return <p>no service found</p>;


  // const universityServices = [
  //   {
  //     title: 'Counselling',
  //     description:
  //       'Our experienced counsellors offer support services for mental health. These services are confidential and can be accessed as per your flexibility (both online and in person).',
  //     image:
  //       'https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg?auto=compress&cs=tinysrgb&w=1600',
  //     buttonText: 'Book a session',
  //   },
  //   {
  //     title: 'Connect with On-Campus Support',
  //     description:
  //       'Our dedicated Psychology Counseling service offers confidential guidance and support from qualified professionals right here on campus.',
  //     image:
  //       'https://images.pexels.com/photos/4101146/pexels-photo-4101146.jpeg?auto=compress&cs=tinysrgb&w=1600',
  //     buttonText: 'Learn More',
  //   },
  //   {
  //     title: 'Distress Helping',
  //     description:
  //       'Our immediate crisis resources provide a first point of contact and empathetic support to help you navigate moments of distress.',
  //     image:
  //       'https://images.pexels.com/photos/6712672/pexels-photo-6712672.jpeg?auto=compress&cs=tinysrgb&w=1600',
  //     buttonText: 'Call Now',
  //   },
  // ];

  // const externalServices = [
  //   {
  //     title: 'Tirunesh Hospital Counsellors',
  //     description:
  //       'Our experienced counsellors offer support services for mental health. These services are confidential and can be accessed as per your flexibility (both online and in person).',
  //     image:
  //       'https://www.tbgh.gov.et/images/demo/slider/156.jpg',
  //     buttonText: 'Book a session',
  //   },
  //   {
  //     title: 'Access Tirunesh Hospital Counseling Services',
  //     description:
  //       'Benefit from mental health support provided by Tirunesh Hospital, in partnership with our campus, offering expert care and guidance.',
  //     image:
  //       'https://wemind.org.et/wp-content/uploads/2024/11/155-1-768x400.png',
  //     buttonText: 'Learn More',
  //   },
  //   {
  //     title: 'Distress Helping',
  //     description:
  //       'Our immediate crisis resources provide a first point of contact and empathetic support to help you navigate moments of distress.',
  //     image:
  //       'https://images.pexels.com/photos/6712712/pexels-photo-6712712.jpeg?auto=compress&cs=tinysrgb&w=1600',
  //     buttonText: 'Call Now',
  //   },
  // ];

  return (
    <>
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12 text-center">External Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceSection;
