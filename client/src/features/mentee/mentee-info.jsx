import React from "react";
import { useMentor } from "./useMentor";

function MentorSidebar() {
  const menteeId = localStorage.getItem("id");
  console.log(menteeId);

  const { data, isLoading, isError, error } = useMentor();

  const mentor = data?.data?.mentor;

  if (isLoading) {
    return (
      <div className="bg-background text-foreground rounded-xl p-4 w-full sm:h-[98%] flex flex-col gap-2 text-[13px] border border-border">
        <div className="font-normal text-xs mb-1">My Mentor</div>
        <div className="flex items-center justify-center h-32">
          <div className="text-foreground/60">Loading mentor info...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-background text-foreground rounded-xl p-4 w-full sm:h-[98%] flex flex-col gap-2 text-[13px] border border-border">
        <div className="font-normal text-xs mb-1">My Mentor</div>
        <div className="flex items-center justify-center h-32">
          <div className="text-red-500 text-center">
            <div className="text-sm font-medium">Error</div>
            <div className="text-xs mt-1">{error.message}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="bg-background text-foreground rounded-xl p-4 w-full sm:h-[98%] flex flex-col gap-2 text-[13px] border border-border">
        <div className="font-normal text-xs mb-1">My Mentor</div>
        <div className="flex items-center justify-center h-32">
          <div className="text-foreground/60 text-center">
            <div className="text-sm font-medium">No Mentor Assigned</div>
            <div className="text-xs mt-1">
              Contact admin for mentor assignment
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground rounded-xl p-4 w-full sm:h-[98%] flex flex-col gap-2 text-[13px] border border-border">
      <div className="font-normal text-xs mb-1">My Mentor</div>

      <div className="border-border rounded-lg flex items-center justify-between px-3 py-2 mb-2">
        <span className="text-foreground text-sm">
          Hello, <span className="font-medium">{mentor.name}</span>
        </span>
        <img
          src={
            mentor.profile_photo_url ||
            `https://ui-avatars.com/api/?name=${mentor.name}&background=random`
          }
          alt={mentor.name}
          className="w-9 h-9 rounded-full object-cover ml-2 border"
        />
      </div>

      <div
        className="text-[13px] text-foreground mb-4"
        style={{ lineHeight: "1.2" }}
      >
        {mentor.bio ||
          mentor.about ||
          `Hi! I'm ${mentor.name}, a ${mentor.major} student.`}
      </div>

      <div className="mt-2 mb-1 font-normal text-[13px]">Get in touch</div>
      <div className="flex flex-col gap-2">
        <div className="text-[13px] text-foreground">📧 {mentor.email}</div>
        <div className="text-[13px] text-foreground">
          {mentor.major} - Year {mentor.year}
        </div>
        {mentor.contact_link && (
          <div className="text-[13px] text-foreground">
            🔗{" "}
            <a
              href={mentor.contact_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Contact Link
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default MentorSidebar;
