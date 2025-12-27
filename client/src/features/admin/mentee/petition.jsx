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

  const counseling = data?.data?.counseling;
  const counselor = counseling?.counselor;
  const application = counseling?.application;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const mutation = useMutation({
    mutationFn: (formData) => menteeAPI.submitPetition(formData),
    onSuccess: () => {
      toast.success("Petition submitted successfully!");
      reset();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to submit petition.");
    },
  });

  const onSubmit = (formData) => {
    if (!counselor) {
      toast.error("You must have an assigned counselor to submit a petition.");
      return;
    }
    mutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your counselor info...</p>
        </div>
      </div>
    );
  }

  if (isError || !counseling || !counselor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-3">No Assigned Counselor</h1>
          <p className="text-gray-600 mb-6">
            You need an assigned counselor to submit a petition.
          </p>
          <div className="bg-gray-100 rounded-lg p-4 text-left">
            <p className="text-sm text-gray-700">
              Petitions are formal requests sent to your counselor for session changes,
              concerns, feedback, or special requests.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <FileText className="w-12 h-12 mx-auto text-primary mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit a Petition</h1>
          <p className="text-gray-600">Send a formal request to your counselor</p>
        </div>

        {/* Counselor Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={
                counselor.photo && counselor.photo !== "default.jpeg"
                  ? `http://localhost:5000/img/users/${counselor.photo}`
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(counselor.name)}&background=random`
              }
              alt={counselor.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
            />
            <div className="text-center md:text-left flex-1">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <UserCheck className="w-5 h-5 text-green-600" />
                <h2 className="text-2xl font-semibold">{counselor.name}</h2>
              </div>
              <p className="text-gray-600 mt-1">Your Assigned Counselor</p>
              <p className="text-sm text-gray-500">✉️ {counselor.email}</p>
              {application?.profession && (
                <p className="text-sm text-primary font-medium mt-2 capitalize">
                  {application.profession}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("subject", { required: "Subject is required" })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., Request to change session time"
            />
            {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={10}
              {...register("body", { required: "Description is required" })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Provide full details about your request or concern..."
            />
            {errors.body && <p className="mt-1 text-sm text-red-600">{errors.body.message}</p>}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={() => reset()}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={isSubmitting || mutation.isPending}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50"
            >
              {mutation.isPending ? (
                <>Submitting...</>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Petition
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Your petition will be reviewed by <strong>{counselor.name}</strong>.
        </p>
      </div>
    </div>
  );
}