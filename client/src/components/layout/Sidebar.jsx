import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";


function Sidebar({
  title = "Dashboard",
  navItems = [],
  activePage,
  setActivePage,
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className={`relative h-screen flex flex-col justify-between pt-10 border border-border rounded-lg bg-background text-foreground transition-all duration-300 overflow-y-scroll sidebar-scrollbar ${
        expanded ? "w-40" : "w-14"
      }`}
      style={{
        scrollbarWidth: "extra-small",
        scrollbarColor: " rgb(15, 15, 15)", // black thumb, white track for Firefox
      }}
    >
      {/* Custom scrollbar styles */}
      <style>
        {`
          .sidebar-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .sidebar-scrollbar::-webkit-scrollbar-thumb {
            background: #000;
            border-radius: 4px;
          }
          .sidebar-scrollbar::-webkit-scrollbar-track {
            background: #fff;
            border-radius: 4px;
          }
        `}
      </style>
      {/* Toggle Button */}
      <button
        className="absolute right-1 top-4 z-10 bg-background border border-green-500 rounded-full p-1 shadow transition hover:bg-border"
        onClick={() => setExpanded((prev) => !prev)}
        aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        style={{
          width: 24,
          height: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {expanded ? (
          <FiChevronLeft className="text-lg" />
        ) : (
          <FiChevronRight className="text-lg" />
        )}
      </button>
      <div className="flex-1">
        <h2
          className={`text-xl font-bold mb-6 transition-all duration-300 ${
            expanded ? "opacity-100" : "opacity-0 w-0 h-0 overflow-hidden"
          }`}
        >
          {title}
        </h2>
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li
              key={item}
              onClick={() => setActivePage(item)}
              className={`cursor-pointer py-2 transition text-center ${
                activePage === item
                  ? "bg-primary text-foreground"
                  : "hover:bg-border"
              } ${expanded ? "" : "text-xs"}`}
              title={!expanded ? item : undefined}
            >
              {expanded ? item : item[0]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
