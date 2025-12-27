"use client";

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar.jsx";
import MentorSidebar from "../features/admin/mentee/mentee-info.jsx"; // Counselor info card
import Petition from "../features/admin/mentee/petition.jsx";
import MenteeChat from "../features/chat/MenteeChat.jsx";

export default function Mentee() {
  const location = useLocation();

  // Default to "Message" (chat) on page load
  const [activePage, setActivePage] = useState("Message");

  const navItems = ["Message","Petition"];

  // Allow navigation from other pages to override default
  useEffect(() => {
    if (location.state?.currentPage && navItems.includes(location.state.currentPage)) {
      setActivePage(location.state.currentPage);
    }
  }, [location.state]);

  // Render main content
  const renderContent = () => {
    if (activePage === "Petition") {
      return <Petition />;
    }
    return <MenteeChat />; // Default: Message (chat)
  };

  // Only show counselor info sidebar when Petition is active
  const isPetitionActive = activePage === "Petition";

  return (
    <div className="flex flex-1 pt-20">
      {/* Left Sidebar - Navigation */}
      <Sidebar
        title="Mentee"
        navItems={navItems}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main Layout: Content + Optional Right Sidebar */}
      <div className="flex-1 flex flex-row gap-5 py-2 px-5">
        {/* Primary Content Area */}
        <div className="flex-1 bg-background text-foreground border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="h-full overflow-y-auto p-6">
            {renderContent()}
          </div>
        </div>

        {/* Right Sidebar: Counselor Info — ONLY on Petition page */}
        {isPetitionActive && (
          <div className="hidden lg:block w-80 min-w-[280px] max-w-[320px]">
            <div className="bg-background text-foreground border border-border rounded-xl shadow-sm h-full overflow-y-auto">
              <MentorSidebar />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}