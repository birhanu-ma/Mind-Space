import React, { useState } from "react";

const PrivacySettings = () => {
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    allowMentorContact: true,
  });

  const handleChange = (key, value) =>
    setPrivacy((prev) => ({ ...prev, [key]: value }));

  const save = () => alert("Privacy settings saved!");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Privacy Settings</h2>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
        <select
          value={privacy.profileVisibility}
          onChange={(e) => handleChange("profileVisibility", e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="public">Public</option>
          <option value="mentors">Mentors Only</option>
          <option value="private">Private</option>
        </select>

        {Object.entries(privacy)
          .filter(([key]) => key !== "profileVisibility")
          .map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
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
          Save Privacy Settings
        </button>
      </div>
    </div>
  );
};

export default PrivacySettings;
