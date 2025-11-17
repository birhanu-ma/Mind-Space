"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { professionalAPI } from "../../service/client"; // ← Make sure this exists

function CreateProfessionForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      user: "",
      profession: "",
      specialization: "",
      experienceYears: "",
      servicesOffered: "",
      profileImage: "",
      rating: 0,
      verified: false,
      active: true,
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: professionalAPI.createProfessional, // POST /api/v1/professionals
    onSuccess: () => {
      toast.success("✅ Professional created successfully!");
      reset();
    },
    onError: (error) => {
      toast.error(
        `Failed to create professional: ${
          error.response?.data?.message || error.message
        }`
      );
    },
  });

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      specialization: data.specialization
        ? data.specialization.split(",").map((s) => s.trim())
        : [],
      servicesOffered: data.servicesOffered
        ? data.servicesOffered.split(",").map((s) => s.trim())
        : [],
    };

    mutate(formattedData);
  };

  return (
    <div className="h-auto bg-background text-foreground py-20">
      <div className="max-w-3xl mx-auto px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-background border border-border rounded-xl shadow-lg p-8 space-y-6"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Create New Professional
            </h2>
            <p className="text-foreground/60">
              Fill in details below to add a professional
            </p>
          </div>

          {/* User ID */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              User ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("user", { required: "User ID is required" })}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg"
              placeholder="MongoDB User ID"
            />
            {errors.user && (
              <p className="text-red-500 text-sm mt-1">
                {errors.user.message}
              </p>
            )}
          </div>

          {/* Profession */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Profession <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("profession", {
                required: "Profession is required",
              })}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg"
              placeholder="e.g., Therapist, Coach, Psychologist"
            />
            {errors.profession && (
              <p className="text-red-500 text-sm mt-1">
                {errors.profession.message}
              </p>
            )}
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Specialization (comma separated)
            </label>
            <input
              type="text"
              {...register("specialization")}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg"
              placeholder="e.g., Anxiety, Stress, Motivation"
            />
          </div>

          {/* Services Offered */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Services Offered (comma separated)
            </label>
            <input
              type="text"
              {...register("servicesOffered")}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg"
              placeholder="e.g., Counseling, Therapy, Coaching"
            />
          </div>

          {/* Experience Years */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Experience Years
            </label>
            <input
              type="number"
              {...register("experienceYears")}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg"
              placeholder="Years of experience"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Profile Image URL
            </label>
            <input
              type="text"
              {...register("profileImage")}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg"
              placeholder="https://example.com/profile.jpg"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Rating (0–5)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              {...register("rating")}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg"
              placeholder="3.5"
            />
          </div>

          {/* Verified */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register("verified")}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <label className="text-sm text-foreground">Mark as verified</label>
          </div>

          {/* Active */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register("active")}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <label className="text-sm text-foreground">
              Mark as active (visible to users)
            </label>
          </div>

          {/* Submit */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting || isLoading
                ? "Publishing..."
                : "Create Professional"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProfessionForm;
