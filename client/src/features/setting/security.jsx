import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { authAPI } from "../../service/client";

const Security = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

  // React Query mutation
  const mutation = useMutation({
    mutationFn: async (data) => {
      // Calls your backend API
      const res = await authAPI.updatePassword(data);
      return res;
    },
    onSuccess: () => {
      reset();
      alert("Password updated successfully!");
    },
  });

  // Handle form submit
  const onSubmit = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      return alert("New passwords do not match!");
    }

    mutation.mutate({
      passwordCurrent: data.currentPassword,
      password: data.newPassword,
      passwordConfirm: data.confirmPassword,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Security Settings</h2>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-foreground/60 mb-1">
              Current Password
            </label>
            <input
              type="password"
              {...register("currentPassword", {
                required: "Current password is required",
              })}
              placeholder="Enter your current password"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-foreground/60 mb-1">
              New Password
            </label>
            <input
              type="password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Enter a new password"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-foreground/60 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your new password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              placeholder="Confirm your new password"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={mutation.isLoading}
            className={`px-4 py-2 rounded-md text-primary-foreground ${
              mutation.isLoading
                ? "bg-primary/70 cursor-not-allowed"
                : "bg-primary hover:bg-primary/90"
            }`}
          >
            {mutation.isLoading ? "Updating..." : "Update Password"}
          </button>

          {/* Mutation Errors */}
          {mutation.isError && (
            <p className="text-red-600 text-sm mt-2">
              {mutation.error?.message || "Error updating password."}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Security;
