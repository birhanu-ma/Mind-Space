import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar.jsx";
import MentorDashboard from "../features/Counselor/MentorDashboard.jsx";
import MyMentee from "../features/Counselor/MyMentee.jsx";
import MentorApplicationForm from "../features/Counselor/Application.jsx";
import MentorChat from "../features/chat/MentorChat.jsx";
import { useLocation } from "react-router-dom";

function MentorPage() {
  const [activePage, setActivePage] = useState("My Mentee");

  const location = useLocation();
  console.log(location);
  const navItems = ["My Mentee", "Application", "Message"];
  useEffect(() => {
    if (location.state?.currentPage) {
      setActivePage(location.state.currentPage);
    }
  }, [location.state]);

  const renderContent = () => {
    switch (activePage) {
      case "My Mentee":
        return <MyMentee />;
      case "Application":
        return <MentorApplicationForm />;
      case "Message":
        return <MentorChat />;
      default:
        return <MyMentee />;
    }
  };

  return (
    <div className="flex flex-1 pt-20">
      <Sidebar
        title="Mentor"
        navItems={navItems}
        activePage={activePage}
        setActivePage={setActivePage}
        className=""
      />
      <div className="flex-1  py-2 px-5 overflow-y-auto bg-background text-foreground border border-border rounded-lg">
        {renderContent(activePage)}
      </div>
    </div>
  );
}

export default MentorPage;
