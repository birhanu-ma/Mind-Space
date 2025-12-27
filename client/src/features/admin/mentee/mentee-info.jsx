import React from "react";
import { useMentor } from "./useMentor"; // assuming this hook fetches getCounselorForMentee

function CounselorSidebar() {
  const menteeId = localStorage.getItem("id");
  console.log("Mentee ID:", menteeId);

  const { data, isLoading, isError, error } = useMentor();

  // Extract the full counseling object
  const counseling = data?.data?.counseling;
  const counselor = counseling?.counselor; // This is the populated counselorUser (User document)
  const application = counseling?.application; // Populated counselorApplication

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-background text-foreground rounded-xl p-4 w-full sm:h-[98%] flex flex-col gap-2 text-[13px] border border-border">
        <div className="font-normal text-xs mb-1">My Counselor</div>
        <div className="flex items-center justify-center h-32">
          <div className="text-foreground/60">Loading counselor info...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="bg-background text-foreground rounded-xl p-4 w-full sm:h-[98%] flex flex-col gap-2 text-[13px] border border-border">
        <div className="font-normal text-xs mb-1">My Counselor</div>
        <div className="flex items-center justify-center h-32">
          <div className="text-red-500 text-center">
            <div className="text-sm font-medium">Error Loading Counselor</div>
            <div className="text-xs mt-1">{error?.message || "Something went wrong"}</div>
          </div>
        </div>
      </div>
    );
  }

  // No counselor assigned
  if (!counseling || !counselor) {
    return (
      <div className="bg-background text-foreground rounded-xl p-4 w-full sm:h-[98%] flex flex-col gap-2 text-[13px] border border-border">
        <div className="font-normal text-xs mb-1">My Counselor</div>
        <div className="flex items-center justify-center h-32">
          <div className="text-foreground/60 text-center">
            <div className="text-sm font-medium">No Counselor Assigned Yet</div>
            <div className="text-xs mt-1">
              Your counseling session is being processed. Please check back soon.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main UI when counselor is assigned
  return (
    <div className="bg-background text-foreground rounded-xl p-4 w-full sm:h-[98%] flex flex-col gap-3 text-[13px] border border-border">
      <div className="font-normal text-xs mb-1 text-foreground/80">My Counselor</div>

      {/* Counselor Name + Photo */}
      <div className="flex items-center justify-between bg-secondary/30 rounded-lg px-4 py-3">
        <div className="flex flex-col">
          <span className="text-sm font-medium">{counselor.name}</span>
          <span className="text-xs text-foreground/60">Your assigned counselor</span>
        </div>
        <img
          src={
            counselor.photo
              ? `/uploads/${counselor.photo}` // Adjust path if needed
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(counselor.name)}&background=random&color=fff`
          }
          alt={counselor.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-border"
        />
      </div>

      {/* Specialties / Support Areas */}
      {application?.supportAreas && application.supportAreas.length > 0 && (
        <div>
          <div className="text-xs font-medium text-foreground/80 mb-1">Support Areas</div>
          <div className="flex flex-wrap gap-2">
            {application.supportAreas.map((area, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Degree & Certifications */}
      {(application?.degreeLevel || application?.certifications?.length > 0) && (
        <div>
          <div className="text-xs font-medium text-foreground/80 mb-1">Qualifications</div>
          <div className="text-[13px] space-y-1">
            {application.degreeLevel && (
              <div>📚 Degree: {application.degreeLevel.charAt(0).toUpperCase() + application.degreeLevel.slice(1)}</div>
            )}
            {application.certifications && application.certifications.length > 0 && (
              <div>🏆 Certifications: {application.certifications.join(", ")}</div>
            )}
          </div>
        </div>
      )}

      {/* Session Info */}
      <div className="text-xs border-t border-border/50 pt-3 mt-2">
        <div className="flex justify-between">
          <span className="text-foreground/70">Status</span>
          <span className="font-medium capitalize text-green-600">
            {counseling.status.replace("-", " ")}
          </span>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-foreground/70">Assigned on</span>
          <span className="font-medium">
            {new Date(counseling.startDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-2">
        <div className="text-xs font-medium text-foreground/80 mb-2">Get in Touch</div>
        <div className="space-y-2 text-[13px]">
          <div className="flex items-center gap-2">
            <span>📧</span>
            <a href={`mailto:${counselor.email}`} className="text-blue-500 hover:underline">
              {counselor.email}
            </a>
          </div>
          {application?.timezone && (
            <div className="flex items-center gap-2">
              <span>🌍</span>
              <span>Timezone: {application.timezone}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CounselorSidebar;