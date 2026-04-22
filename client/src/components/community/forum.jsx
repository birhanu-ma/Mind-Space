"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { forumAPI } from "../../service/client"; // ← make sure this exists and points to your article endpoint
import { useNavigate } from "react-router-dom";

function ForumCreateForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      header: "",
      subHeader: "",
      list: "",
      img: "",
      category: "",
      tags: "",
      forumType: "mental",
      active: false,
    },
  });

  const { mutate, isLoading, error } = useMutation({
    mutationFn: forumAPI.createForums, // POST /api/v1/forums
    onSuccess: () => {
      toast.success("✅ forum created successfully!");
      reset();
    },

    onError: (error) => {
      toast.error(
        `Failed to create forum: ${
          error.response?.data?.message || error.message
        }`,
      );
    },
  });
  if (error) {
    if (error.response?.status === 401) {
      navigate("/Register", { state: { from: window.location.pathname } });
      return null;
    }
  }

  const onSubmit = (data) => {
    // convert comma-separated tags to array
    const formattedData = {
      ...data,
      tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
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
              Create New Forum
            </h2>
            <p className="text-foreground/60">
              Fill in the details below to publish a new forum
            </p>
          </div>

          {/* Header */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Header <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("header", {
                required: "Header is required",
                minLength: { value: 5, message: "Minimum 5 characters" },
              })}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the main title..."
            />
            {errors.header && (
              <p className="text-red-500 text-sm mt-1">
                {errors.header.message}
              </p>
            )}
          </div>

          {/* SubHeader */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Subheader
            </label>
            <input
              type="text"
              {...register("subHeader")}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg"
              placeholder="Optional subtitle..."
            />
          </div>

          {/* Article Content (List or Body) */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Forum Content / List
            </label>
            <textarea
              {...register("list")}
              rows={6}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Write the article content or bullet points..."
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Image URL
            </label>
            <input
              type="text"
              {...register("img")}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Category
            </label>
            <input
              type="text"
              {...register("category")}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg"
              placeholder="e.g., Mental Health, Motivation..."
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              {...register("tags")}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg"
              placeholder="e.g., depression, stress, wellness"
            />
          </div>

          {/* Article Type */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Forum Type
            </label>
            <select
              {...register("articleType")}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg"
            >
              <option value="mental">Mental</option>
              <option value="motication">Motication</option>
            </select>
          </div>

          {/* Active Checkbox */}
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

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting || isLoading ? "Publishing..." : "Publish Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForumCreateForm;
