import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ServiceCard from "./ServiceCard";
import { serviceAPI } from "../../service/client";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";

const ServiceSection = () => {
  const navigate = useNavigate();
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
  if (error) {
    if (error.response?.status === 401) {
      navigate("/Register", { state: { from: window.location.pathname } });
      return null;
    }
  }

  const Services = service?.data || [];
  if (Services.length === 0)
    return <p className="text-center mt-10">No services found.</p>;

  return (
    <>
      {/* Internal Services */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12 text-center text-gray-900">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* External Services */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12 text-center text-gray-900">
            External Services
          </h2>
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
