"use client";

import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/ui/Spinner.jsx";
import { adminAssignmentAPI } from "../../service/client.jsx"; // Adjust path if needed
import { toast } from "sonner";
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  MessageCircle,
  BookOpen,
  GraduationCap,
  UserCheck,
} from "lucide-react";

export default function MenteeDetail() {
  const { id: menteeId } = useParams(); // menteeId from URL

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["mentee", menteeId],
    queryFn: () => adminAssignmentAPI.getMenteeDetail(menteeId),
    enabled: !!menteeId,
    onError: () => toast.error("Failed to load mentee details"),
  });

  const mentee = data?.data?.mentee;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Spinner />
      </div>
    );
  }

  // Error or not found / not assigned
  if (isError || !mentee) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Mentee Not Accessible
          </h2>
          <p className="text-gray-600 mb-6">
            {isError
              ? "Failed to load mentee information."
              : "This mentee is not assigned to you or does not exist."}
          </p>
          <Link
            to="/my-mentees"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to My Mentees
          </Link>
        </div>
      </div>
    );
  }

  const { name, email, photo, createdAt } = mentee;

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {/* Back Link */}
      <Link
        to="/my-mentees"
        className="inline-flex items-center gap-2 text-primary hover:underline mb-6 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to My Mentees
      </Link>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Header - Profile */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-10 md:py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Photo */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-md flex-shrink-0">
              {photo ? (
                <img
                  src={photo.startsWith("/") ? photo : `/uploads/${photo}`}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <User size={64} />
                </div>
              )}
              {/* Active indicator */}
              <div className="absolute bottom-2 right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Name & Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
              <p className="text-lg text-gray-600 mt-1 flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-5 h-5" />
                {email}
              </p>

              <div className="mt-6 flex flex-wrap gap-6 justify-center md:justify-start text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    Assigned on{" "}
                    {new Date(createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-700">
                    Active Mentee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body - Main Content */}
        <div className="p-6 md:p-8 grid gap-8 md:grid-cols-2">
          {/* About / Bio */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              About This Mentee
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {mentee.bio ||
                  "No biography provided yet. This mentee has not added personal information."}
              </p>
            </div>
          </div>

          {/* Academic Info Placeholder */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-indigo-600" />
              Academic Information
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 text-center text-gray-500">
              <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-sm">
                Academic details (major, year, enrollment) will be displayed
                here once available.
              </p>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-6 text-center">
          <Link
            to="/counselor"
            className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition shadow-md"
          >
            <MessageCircle className="w-5 h-5" />
            Message {name.split(" ")[0]}
          </Link>
          <p className="text-sm text-gray-600 mt-3">
            Open chat to provide guidance and support
          </p>
        </div>
      </div>
    </div>
  );
}
