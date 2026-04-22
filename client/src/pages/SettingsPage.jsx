import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import NotificationSettings from "../features/setting/notification.jsx";
import PrivacySettings from "../features/setting/privacy.jsx";
import Security from "../features/setting/security.jsx";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("notifications");
  const navigate = useNavigate();

  const user = localStorage.getItem("id");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <div className="min-h-screen pt-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-background border border-border rounded-lg sm:p-8">
          <div className="flex items-start justify-start mb-4">
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-foreground font-semibold rounded-full hover:bg-blue-700 hover:text-white transition-colors duration-200 bg-background border border-border shadow-sm hover:shadow-md"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <h1 className="text-3xl font-bold mb-8">Settings</h1>

          {/* Tabs */}
          <div className="flex flex-col sm:flex-row space-x-1 sm:mb-8 border-b border-border">
            {[
              { id: "notifications", label: "Notifications" },
              { id: "privacy", label: "Privacy" },
              { id: "security", label: "Security" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`sm:px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-foreground/60 hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "privacy" && <PrivacySettings />}
          {activeTab === "security" && <Security />}
        </div>
      </div>
    </div>
  );
};

export default Settings;
