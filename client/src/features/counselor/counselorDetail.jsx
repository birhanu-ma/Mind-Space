import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { adminAssignmentAPI } from "../../service/client";
import RankedMenteeList from "../mentee/RankedMenteeList";
import Spinner from "../../components/ui/Spinner.jsx";

export default function CounselorDetail() {
  const { counselorId } = useParams();
  const [showMentees, setShowMentees] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["counselor", counselorId],
    queryFn: () => adminAssignmentAPI.getCounselor(counselorId),
  });

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <p className="p-6 text-sm text-red-500">Failed to load counselor</p>
    );

  const counselor = data?.data?.data;
  if (!counselor)
    return (
      <p className="p-6 text-sm text-foreground">No counselor found.</p>
    );

  const renderList = (items) => (items?.length ? items.join(", ") : "—");

  return (
    <div className="max-w-7xl mx-auto px-5 py-20">
      <div className="bg-background border border-border rounded-xl shadow-sm">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 text-left">
          {/* Left — Profile */}
          <div>
            <div className="mb-4">
              <div className="w-32 h-32 rounded-full mb-4 bg-muted flex items-center justify-center text-sm text-foreground/60 overflow-hidden">
                {counselor.user?.photo ? (
                  <img
                    src={counselor.user.photo}
                    alt={counselor.user?.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  "No Photo"
                )}
              </div>

              <h2 className="text-2xl font-semibold text-foreground">
                {counselor.user?.name || "Unnamed"}
              </h2>
              <p className="text-sm text-foreground/60 mb-4">
                {counselor.profession || "—"}
              </p>

              <div className="space-y-2 text-sm text-foreground">
                <p>
                  <span className="font-medium">Degree Level:</span>{" "}
                  {counselor.degreeLevel || "—"}
                </p>
                <p>
                  <span className="font-medium">Experience:</span>{" "}
                  {counselor.experienceYears} years
                </p>
                <p>
                  <span className="font-medium">Age:</span>{" "}
                  {counselor.mentorAge || "—"}
                </p>
                <p>
                  <span className="font-medium">Max Mentees:</span>{" "}
                  {counselor.maxMentees || "—"}
                </p>
                <p>
                  <span className="font-medium">Timezone:</span>{" "}
                  {counselor.timezone || "—"}
                </p>
                <p>
                  <span className="font-medium">Background Check:</span>{" "}
                  {counselor.backgroundCheckStatus || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Middle — Bio */}
          <div className="md:border-l md:border-r border-foreground/20 md:px-8">
            <h3 className="text-lg font-semibold mb-4">Bio</h3>
            <p className="text-sm text-foreground/70">
              {counselor.bio || "No bio provided."}
            </p>
          </div>

          {/* Right — Skills & Preferences */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Skills & Preferences
            </h3>

            <div className="space-y-1 mb-4 text-sm">
              {Object.entries(counselor.comfortLevels || {}).map(
                ([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span>{key}</span>
                    <span className="font-medium">{value}/5</span>
                  </div>
                )
              )}
            </div>

            <div className="space-y-2 text-sm text-foreground">
              <p>
                <span className="font-medium">Certifications:</span>{" "}
                {renderList(counselor.certifications)}
              </p>
              <p>
                <span className="font-medium">Communication Styles:</span>{" "}
                {renderList(counselor.communicationStyles)}
              </p>
              <p>
                <span className="font-medium">Personality Style:</span>{" "}
                {renderList(counselor.personalityStyle)}
              </p>
              <p>
                <span className="font-medium">Preferred Mentee Goals:</span>{" "}
                {renderList(counselor.preferredMenteeGoals)}
              </p>
              <p>
                <span className="font-medium">Support Areas:</span>{" "}
                {renderList(counselor.supportAreas)}
              </p>
              <p>
                <span className="font-medium">Avoid Topics:</span>{" "}
                {renderList(counselor.avoidTopics)}
              </p>
              <p>
                <span className="font-medium">Can Handle Crisis:</span>{" "}
                {counselor.canHandleCrisis}
              </p>
              <p>
                <span className="font-medium">Priority Factor:</span>{" "}
                {counselor.priorityFactor}
              </p>
              <p>
                <span className="font-medium">Mentee Age Preference:</span>{" "}
                {counselor.menteeAgePreference}
              </p>
              <p>
                <span className="font-medium">
                  Mental Health Specialties:
                </span>{" "}
                {renderList(counselor.mentalHealthSpecialties)}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6">
          <button
            onClick={() => setShowMentees(!showMentees)}
            className="text-xs font-semibold px-4 py-2 rounded-md border bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            {showMentees ? "Hide Mentees" : "Assign Mentees"}
          </button>
        </div>

        {/* Ranked Mentees */}
        {showMentees && (
          <div className="border-t border-foreground/20 px-6 py-6">
            <h3 className="text-lg font-semibold mb-4">Ranked Mentees</h3>
            <RankedMenteeList counselorId={counselorId} />
          </div>
        )}
      </div>
    </div>
  );
}
