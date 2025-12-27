import React from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { menteeAPI } from "../../../service/client";
import { toast } from "sonner";
import { FileText, Send, AlertCircle, UserCheck } from "lucide-react";

export default function Petition() {
  const menteeId = localStorage.getItem("id");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["counselorInfo", menteeId],
    queryFn: () => menteeAPI.getCounselor(menteeId),
    enabled: !!menteeId,
    retry: false,
  });

  // Updated to match your actual response structure
  const counseling = data?.data?.counseling;
  const counselor = counseling?.counselor; // populated counselorUser
  const application = counseling?.application;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const mutation = useMutation({
    mutationFn: menteeAPI.submitPetition,
    onSuccess: () => {
      toast.success("Petition submitted successfully!");
      reset();
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "Failed to submit petition. Please try again."
      );
    },
  });

  const onSubmit = (formData) => {
    if (!counselor) {
      return toast.error("You must have an assigned counselor to submit a petition.");
    }
    mutation.mutate(formData);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Checking your counselor assignment...</p>
        </div>
      </div>
    );
  }

  // No counselor assigned
  if (isError || !counseling || !counselor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Cannot Submit Petition
          </h1>
          <p className="text-gray-600 mb-6">
            You need an assigned counselor before you can submit a petition.
          </p>
          <div className="bg-gray-100 rounded-lg p-4 text-left">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Petitions are formal requests sent directly to your counselor
              for issues like session changes, concerns, or special accommodations.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main form when counselor is assigned
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <FileText className="w-12 h-12 mx-auto text-primary mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit a Petition</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Send a formal request to your assigned counselor regarding your counseling experience.
          </p>
        </div>

        {/* Counselor Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={
                  counselor.photo
                    ? `/uploads/${counselor.photo}`
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(counselor.name)}&background=random&color=fff`
                }
                alt={counselor.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
              />
              <div>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-semibold">{counselor.name}</h2>
                </div>
                <p className="text-gray-600">Your Assigned Counselor</p>
                <p className="text-sm text-gray-500 mt-1">📧 {counselor.email}</p>
              </div>
            </div>
            {application?.supportAreas && (
              <div className="hidden md:flex flex-wrap gap-2 justify-end">
                {application.supportAreas.slice(0, 3).map((area) => (
                  <span
                    key={area}
                    className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                  >
                    {area}
                  </span>
                ))}
                {application.supportAreas.length > 3 && (
                  <span className="text-xs px-3 py-1 text-gray-500">
                    +{application.supportAreas.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Petition Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                id="subject"
                type="text"
                {...register("subject", { required: "Subject is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="e.g., Request for session rescheduling"
              />
              {errors.subject && (
                <p className="mt-2 text-sm text-red-600">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="body"
                rows={8}
                {...register("body", { required: "Description is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                placeholder="Clearly explain your concern, request, or issue. Include any relevant details, dates, or supporting information..."
              />
              {errors.body && (
                <p className="mt-2 text-sm text-red-600">{errors.body.message}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={() => reset()}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={isSubmitting || mutation.isPending}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {mutation.isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Petition
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Your petition will be sent directly to <strong>{counselor.name}</strong> for review.
        </p>
      </div>
    </div>
  );
}