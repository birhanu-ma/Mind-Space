import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import ServiceCard from "./ServiceCard";
import { serviceAPI } from "../../service/client";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { Sparkles, Globe, LayoutGrid } from "lucide-react";

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
    placeholderData: (previousData) => previousData,
    retry: false,
  });

  if (isLoading && !service) return <Spinner />;

  if (error) {
    if (error.response?.status === 401) {
      navigate("/Register", { state: { from: window.location.pathname } });
      return null;
    }
  }

  const Services = service?.data || [];

  return (
    // Added overflow-hidden to prevent animations from creating scrollbars
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-[#FDFDFD] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-blue-600 font-bold tracking-widest text-xs uppercase mb-4"
            >
              <Sparkles size={14} />
              Care Catalog
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-tight">
              Professional <br className="hidden md:block" /> Services.
            </h2>
          </div>

          {/* Responsive Toggle Switch */}
          {/* 
              - 'w-full lg:w-auto': Full width on mobile
              - 'grid grid-cols-1 sm:grid-cols-3': Stacks on tiny phones, 3 cols on small tablets, inline on desktop
          */}
          <div className="w-full lg:w-auto inline-grid grid-cols-1 sm:grid-cols-3 bg-gray-100 p-1.5 rounded-2xl border border-gray-200 gap-1">
            {[
              { id: "internal", label: "Our Services", icon: LayoutGrid },
              { id: "external", label: "Partners", icon: Globe },
              { id: "All", label: "View All", icon: Sparkles },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setServiceType(t.id)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  serviceType === t.id
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
                }`}
              >
                <t.icon size={16} className="shrink-0" />
                <span className="whitespace-nowrap">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid Section */}
        <div className="min-h-[400px]">
          {Services.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-center py-20 border-2 border-dashed border-gray-100 rounded-[2rem] md:rounded-[3rem]"
            >
              <p className="text-gray-400 font-light text-lg">No services found in this category.</p>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
            >
              <AnimatePresence mode="popLayout">
                {Services.map((item, index) => (
                  <motion.div
                    key={item.id || index}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <ServiceCard service={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;