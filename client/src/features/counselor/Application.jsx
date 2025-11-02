"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { mentorAPI } from "../../service/client";
import { toast } from "sonner";

function MentorApplicationForm() {
  const currentStudent = JSON.parse(localStorage.getItem("student")) || {};

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      motivation: "",
      experience: "",
      communication: "",
    },
  });

  useEffect(() => {
    if (currentStudent) {
      setValue("student_id", currentStudent.sims_id || "");
      setValue("department", currentStudent.major || "");
      setValue("year", currentStudent.year || "");
      setValue("region", currentStudent.region || "");
    }
  }, [currentStudent, setValue]);

  const { mutate, isLoading } = useMutation({
    mutationFn: mentorAPI.submitApplication,
    onSuccess: () => {
      toast.success("Application submitted successfully! ✅");
      reset();
    },
    onError: (error) => {
      toast.error(
        `Failed to submit application: ${
          error.response?.data?.message || error.message
        }`
      );
    },
  });

  const onSubmit = (data) => {
    mutate({
      ...data,
      student_id: currentStudent.sims_id,
      department: currentStudent.major,
      year: currentStudent.year,
      region: currentStudent.region,
    });
  };

  return (
    <div className="h-160 bg-background text-foreground py-8 overflow-y-scroll">
      <div className="max-w-2xl mx-auto px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-background text-foreground border border-border rounded-lg shadow-lg p-8 space-y-6"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Mentor Application
            </h2>
            <p className="text-foreground/60">
              Apply to become a mentor and help guide fellow students
            </p>
          </div>

          {/* Auto-filled read-only fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Student ID
              </label>
              <input
                type="text"
                {...register("student_id")}
                readOnly
                className="w-full border border-border bg-gray-100 text-gray-600 px-4 py-3 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Department
              </label>
              <input
                type="text"
                {...register("department")}
                readOnly
                className="w-full border border-border bg-gray-100 text-gray-600 px-4 py-3 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Academic Year
              </label>
              <input
                type="text"
                {...register("year")}
                readOnly
                className="w-full border border-border bg-gray-100 text-gray-600 px-4 py-3 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Region
              </label>
              <input
                type="text"
                {...register("region")}
                readOnly
                className="w-full border border-border bg-gray-100 text-gray-600 px-4 py-3 rounded-lg"
              />
            </div>
          </div>

          {/* Motivation */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Motivation <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("motivation", {
                required: "Motivation is required",
                minLength: { value: 5, message: "Minimum 5 characters" },
              })}
              rows={4}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              placeholder="Explain why you want to become a mentor..."
            />
            {errors.motivation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.motivation.message}
              </p>
            )}
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Experience <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("experience", {
                required: "Experience is required",
                minLength: { value: 5, message: "Minimum 5 characters" },
              })}
              rows={4}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              placeholder="Describe your relevant experience..."
            />
            {errors.experience && (
              <p className="text-red-500 text-sm mt-1">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Communication */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Communication Skill
            </label>
            <input
              type="number"
              {...register("communication", {
                min: { value: 1, message: "Minimum 1" },
                max: { value: 10, message: "Maximum 10" },
              })}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Rate 1-10"
            />
            {errors.communication && (
              <p className="text-red-500 text-sm mt-1">
                {errors.communication.message}
              </p>
            )}
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting || isLoading
                ? "Submitting Application..."
                : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MentorApplicationForm;
