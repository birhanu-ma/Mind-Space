import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {counselorAPI } from "../../service/client.jsx"; // adjust path if needed
import { toast } from "sonner";
import { FileText, Send } from "lucide-react";

export default function CounselorPetition() {
  const userName = localStorage.getItem("name") || "Counselor";
  const userId = localStorage.getItem("id");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const mutation = useMutation({
    mutationFn: (data) => counselorAPI.submitPetition(data),
    onSuccess: () => {
      toast.success("Petition submitted successfully! The admin will review it soon.");
      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to submit petition.");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <FileText className="w-12 h-12 mx-auto text-primary mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Submit a Petition
          </h1>
          <p className="text-gray-600">
            Request support, report an issue, or suggest improvements as a counselor
          </p>
        </div>

        {/* Sender Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-lg font-semibold text-blue-900">
                {userName}
              </p>
              <p className="text-sm text-blue-700">
                Counselor • Petition to Administrator
              </p>
            </div>
          </div>
        </div>

        {/* Petition Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-6"
        >
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Need more training resources for crisis support"
              {...register("subject", { required: "Subject is required" })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
            )}
          </div>

          {/* Body */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={10}
              placeholder="Please explain your request or concern in detail. Include any relevant information that will help the admin understand and respond effectively..."
              {...register("body", { required: "Description is required" })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
            />
            {errors.body && (
              <p className="mt-1 text-sm text-red-600">{errors.body.message}</p>
            )}
          </div>

          {/* Buttons */}
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
                  Submit to Admin
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 mt-8">
          This petition will be reviewed by the platform administrators.
        </p>
      </div>
    </div>
  );
}