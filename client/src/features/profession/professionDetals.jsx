import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/ui/Spinner.jsx";
import { professionalAPI } from "../../service/client.jsx";
import { toast } from "sonner";

function ProfessionDetail() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["professional", id],
    queryFn: () => professionalAPI.getProfession(id),
    onError: () => toast.error("Failed to load professional details"),
  });

  // Response: { status: "success", data: { ...application } }
  const professional = data?.data;

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center mt-10">Failed to load details.</p>;
  if (!professional) return <p className="text-center mt-10">No professional found.</p>;

  const {
    user,
    profession,
    degreeLevel,
    supportAreas = [],
    certifications = [],
    availability,
    timezone,
    maxMentees = 2,
    canHandleCrisis = "no",
    status = "approved",
    menteeAgePreference = "Any",
    personalityStyle = [],
    preferredMenteeGoals = [],
    avoidTopics = [],
    comfortLevels = {},
  } = professional;

  return (
    <div className="p-8 pt-30 bg-background text-foreground border border-border max-w-7xl mx-auto rounded-lg shadow-xl font-sans">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-3 gap-8">

        {/* Left Column — Professional Info */}
        <div className="col-span-1">
          <div className="text-center md:text-left mb-6">
            <div className="relative w-36 h-36 rounded-full mx-auto md:mx-0 overflow-hidden mb-4 bg-gray-200">
              {user?.photo && user.photo !== "default.jpeg" ? (
                <img
                  src={`http://localhost:5000/img/users/${user.photo}`}
                  alt={`${user?.name}'s profile`}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  No Photo
                </div>
              )}
            </div>

            <h2 className="text-3xl font-semibold text-foreground/80 capitalize">
              {user?.name || "Unknown"}
            </h2>

            <p className="text-sm text-foreground/60">{user?.email}</p>

            <p className="text-sm text-foreground/60 capitalize">
              Profession: <strong>{profession || "Not specified"}</strong>
            </p>

            <p className="text-sm text-foreground/60">
              Degree: {degreeLevel ? degreeLevel.charAt(0).toUpperCase() + degreeLevel.slice(1) : "None"}
            </p>

            <p className="text-sm text-foreground/60">
              Max Mentees: <strong>{maxMentees}</strong>
            </p>

            <p className="text-sm text-foreground/60">
              Status:{" "}
              <span className={`font-semibold ${status === "approved" ? "text-green-600" : "text-red-600"}`}>
                {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Pending"}
              </span>
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                {user?.role || "counselor"}
              </span>
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                {canHandleCrisis === "yes" ? "Crisis Trained" : "Standard Support"}
              </span>
            </div>

            {/* Optional: Role change disabled for professionals */}
            <div className="mt-6">
              <label className="text-sm font-medium text-foreground/70 block mb-2">
                Role (Fixed)
              </label>
              <select
                value={user?.role || "counselor"}
                disabled
                className="w-full border rounded-md p-2 text-sm bg-background opacity-60 cursor-not-allowed"
              >
                <option value="counselor">Counselor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Middle Column — Bio / Support Areas */}
        <div className="col-span-1 border-l border-foreground/20 pl-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Support Areas</h3>
            {supportAreas.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {supportAreas.map((area) => (
                  <span
                    key={area}
                    className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {area}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-foreground/60">No support areas listed.</p>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Certifications</h3>
            {certifications.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <span
                    key={cert}
                    className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-foreground/60">No certifications listed.</p>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Availability</h3>
            <p className="text-foreground/60">{availability || "Not specified"}</p>
            <p className="text-sm text-foreground/60 mt-1">Timezone: {timezone || "N/A"}</p>
          </div>
        </div>

        {/* Right Column — Professional Overview */}
        <div className="col-span-1 border-l border-foreground/20 pl-8">
          <h3 className="text-xl font-semibold mb-3">Professional Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-foreground/60">
              <span>Profession</span>
              <span className="font-medium text-foreground capitalize">
                {profession || "-"}
              </span>
            </div>
            <div className="flex justify-between text-sm text-foreground/60">
              <span>Degree Level</span>
              <span className="font-medium text-foreground capitalize">
                {degreeLevel || "None"}
              </span>
            </div>
            <div className="flex justify-between text-sm text-foreground/60">
              <span>Max Mentees</span>
              <span className="font-medium text-foreground">{maxMentees}</span>
            </div>
            <div className="flex justify-between text-sm text-foreground/60">
              <span>Mentee Age Preference</span>
              <span className="font-medium text-foreground">{menteeAgePreference}</span>
            </div>
            <div className="flex justify-between text-sm text-foreground/60">
              <span>Personality Style</span>
              <span className="font-medium text-foreground">
                {personalityStyle.length > 0 ? personalityStyle.join(", ") : "Not specified"}
              </span>
            </div>
            <div className="flex justify-between text-sm text-foreground/60">
              <span>Preferred Goals</span>
              <span className="font-medium text-foreground">
                {preferredMenteeGoals.length > 0 ? preferredMenteeGoals.join(", ") : "Not specified"}
              </span>
            </div>
            <div className="flex justify-between text-sm text-foreground/60">
              <span>Avoid Topics</span>
              <span className="font-medium text-foreground">
                {avoidTopics.length > 0 ? avoidTopics.join(", ") : "None"}
              </span>
            </div>
          </div>

          {/* Optional: Comfort Levels Summary */}
          {Object.keys(comfortLevels).length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3">Comfort Topics (Sample)</h3>
              <div className="space-y-2 text-sm">
                {Object.entries(comfortLevels).slice(0, 4).map(([topic, level]) => (
                  <div key={topic} className="flex justify-between">
                    <span className="text-foreground/60">{topic}</span>
                    <span className="font-medium">Level {level}/5</span>
                  </div>
                ))}
                {Object.keys(comfortLevels).length > 4 && (
                  <p className="text-xs text-foreground/50">+{Object.keys(comfortLevels).length - 4} more</p>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ProfessionDetail;