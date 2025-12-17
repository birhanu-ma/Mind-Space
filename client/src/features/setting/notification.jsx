import React, { useState } from "react";

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    sessionReminders: true,
    taskDeadlines: true,
    mentorUpdates: true,
  });

  const handleChange = (key, value) =>
    setNotifications((prev) => ({ ...prev, [key]: value }));

  const save = () => alert("Notification settings saved!");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Notification Preferences</h2>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
        {Object.entries(notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <label className="text-sm font-medium">
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleChange(key, e.target.checked)}
            />
          </div>
        ))}
        <button
          onClick={save}
          className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Save Notification Settings
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
