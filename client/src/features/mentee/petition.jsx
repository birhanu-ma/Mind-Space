import React from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { menteeAPI } from "../../service/client";
import { toast } from "sonner";
import { FileText, Send, AlertCircle } from "lucide-react";

export default function Petition() {
  const menteeId = localStorage.getItem("id");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["mentorInfo", menteeId],
    queryFn: () => menteeAPI.getCounselor(menteeId),
    enabled: !!menteeId,
    retry: false,
  });

  const mentor = data?.data?.counselor;

  const { register, handleSubmit, reset, formState } = useForm();
  const { isSubmitting, errors } = formState;

  const { mutate, isPending } = useMutation({
    mutationFn: menteeAPI.submitPetition,
    onSuccess: () => {
      toast.success("Petition submitted successfully");
      reset();
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Failed to submit petition"),
  });

  const onSubmit = (formData) => {
    if (!mentor)
      return toast.error("You must have a mentor to submit a petition");
    mutate(formData);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-6 w-6 border-b-2 border-primary"></div>
        <span className="ml-2">Checking mentor status...</span>
      </div>
    );

  if (isError || !mentor)
    return (
      <div className="text-center py-20">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h1 className="text-2xl font-semibold text-red-600 mb-2">
          Cannot Submit Petition
        </h1>
        <p className="text-red-500">
          You must have an assigned mentor to submit a petition.
        </p>
      </div>
    );

  // ✅ Form UI
  return (
    <div className=" p-6">
      <div className="text-center mb-6">
        <FileText className="w-10 h-10 mx-auto text-primary mb-3" />
        <h1 className="text-2xl font-semibold">Submit a Petition</h1>
        <p className="text-gray-500 text-sm">
          Submit a formal petition to address your concerns or requests
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-sm">subject *</label>
          <input
            {...register("subject", { required: "subject is required" })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary"
            placeholder="Enter petition subject"
          />
          {errors.subject && (
            <p className="text-sm text-red-500 mt-1">
              {errors.subject.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-sm">
            Description *
          </label>
          <textarea
            rows={5}
            {...register("body", { required: "body is required" })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary"
            placeholder="Describe your petition in detail"
          />
          {errors.body && (
            <p className="text-sm text-red-500 mt-1">{errors.body.message}</p>
          )}
        </div>

        <div className="flex gap-4 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="flex-1 border rounded-lg py-2 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isPending}
            className="flex-1 bg-blue-600 text-white rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50"
          >
            {isPending || isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" /> Submit
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
