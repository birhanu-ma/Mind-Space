import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../components/ui/Spinner.jsx";
import { menteeAPI } from "../../../service/client.jsx";
import { toast } from "sonner";

export default function MenteeDetail() {
  const { menteeId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["mentee", menteeId],
    queryFn: () => menteeAPI.getMentee(menteeId),
    onError: () => toast.error("Failed to load mentee details"),
    enabled: !!menteeId,
  });

  const mentee = data?.data?.data;
  const { user } = mentee || {};
  const { name, email } = user || {};

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <p className="p-6 text-sm text-red-500">Failed to load mentee details.</p>
    );
  if (!mentee)
    return <p className="p-6 text-sm text-foreground">No mentee found.</p>;

  const {
    primaryGoal,
    secondaryGoal,
    availability,
    supportAreas,
    communication,
    comfortLevel,
    preferredMentorPersonality,
    agePreference,
  } = mentee;

  return (
    <div className="max-w-7xl mx-auto px-5 py-20">
      <div className="bg-background border border-border rounded-xl py-10 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 text-left">
          {/* Left — Mentee Info */}
          <div className="mb-6">
            <div className="flex items-start gap-4">
              <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center text-sm text-foreground/60 overflow-hidden">
                No Photo
              </div>
              <div className="flex flex-col justify-start">
                <h2 className="text-2xl font-semibold text-foreground">
                  {name || "Unnamed"}
                </h2>
                <p className="text-sm text-foreground/60">{email || "—"}</p>
                <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full text-xs font-medium bg-purple-100 text-purple-600">
                  Mentee
                </span>
              </div>
            </div>
          </div>

          {/* Middle — Goals & Support */}
          <div className="md:border-l border-foreground/20 md:pl-8">
            <h3 className="text-lg font-semibold mb-4">Goals & Support</h3>
            <div className="space-y-2 text-sm text-foreground">
              <p>
                <span className="font-medium">Primary Goal:</span>{" "}
                {primaryGoal || "—"}
              </p>
              <p>
                <span className="font-medium">Secondary Goal:</span>{" "}
                {secondaryGoal || "—"}
              </p>
              <p>
                <span className="font-medium">Availability:</span>{" "}
                {availability || "—"}
              </p>
              <p>
                <span className="font-medium">Support Areas:</span>{" "}
                {supportAreas?.join(", ") || "—"}
              </p>
            </div>
          </div>

          {/* Right — Preferences */}
          <div className="md:border-l border-foreground/20 md:pl-8">
            <h3 className="text-lg font-semibold mb-4">Preferences</h3>
            <div className="space-y-2 text-sm text-foreground">
              <p>
                <span className="font-medium">Communication:</span>{" "}
                {communication || "—"}
              </p>
              <p>
                <span className="font-medium">Comfort Level:</span>{" "}
                {comfortLevel || "—"}
              </p>
              <p>
                <span className="font-medium">
                  Preferred Mentor Personality:
                </span>{" "}
                {preferredMentorPersonality?.join(", ") || "—"}
              </p>
              <p>
                <span className="font-medium">Age Preference:</span>{" "}
                {agePreference || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
