import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../components/ui/Spinner.jsx";
import { professionalAPI } from "../../service/client.jsx";
import { toast } from "sonner";

function ProfessionDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const reviewedBy = localStorage.getItem("id");

  // 🔹 Fetch user details
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => professionalAPI.getProfessionDetails(id),
    onError: () => toast.error("Failed to load user details"),
  });

  const user = data?.data?.data;

  // 🔹 Role update mutation
  const mutation = useMutation({
    mutationFn: ({ role, id, reviewedBy }) =>
      professionalAPI.reviewProfession({ id, role, reviewedBy }),
    onSuccess: () => {
      toast.success("Role updated successfully");
      queryClient.invalidateQueries(["user", id]);
    },
    onError: () => toast.error("Failed to update role"),
  });

  // 🔹 Handle dropdown change
  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    if (!newRole) return;
    mutation.mutate({ id, role: newRole, reviewedBy });
  };

  if (isLoading) return <Spinner />;
  if (error)
    return <p className="text-red-500">Failed to load user details.</p>;
  if (!user) return <p>No user details found.</p>;

  const {
    sims_id,
    name,
    email,
    enrolment_date,
    major,
    year,
    photo,
    role,
    bio,
    active,
  } = user;

  return (
    <div className="p-8 pt-30 bg-background text-foreground border border-border max-w-7xl mx-auto rounded-lg shadow-xl font-sans">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column — user Info */}
        <div className="col-span-1">
          <div className="text-center md:text-left mb-6">
            <div className="relative w-36 h-36 rounded-full mx-auto md:mx-0 overflow-hidden mb-4 bg-gray-200">
              {photo ? (
                <img
                  src={photo}
                  alt={`${name}'s profile`}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  No Photo
                </div>
              )}
            </div>

            <h2 className="text-3xl font-semibold text-foreground/80">
              {name}
            </h2>
            <p className="text-sm text-foreground/60">SIMS ID: {sims_id}</p>
            <p className="text-sm text-foreground/60">{email}</p>
            <p className="text-sm text-foreground/60">
              Enrolled: {new Date(enrolment_date).toLocaleDateString()}
            </p>
            <p className="text-sm text-foreground/60">Major: {major}</p>
            <p className="text-sm text-foreground/60">Year: {year}</p>
            <p className="text-sm text-foreground/60">
              Active:{" "}
              <span
                className={`font-semibold ${
                  active ? "text-green-600" : "text-red-600"
                }`}
              >
                {active ? "Yes" : "No"}
              </span>
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                {role}
              </span>
            </div>

            {/* 🔹 Role Change Dropdown */}
            <div className="mt-6">
              <label className="text-sm font-medium text-foreground/70 block mb-2">
                Change Role
              </label>
              <select
                onChange={handleRoleChange}
                value={role || ""}
                disabled={mutation.isPending}
                className="w-full border rounded-md p-2 text-sm bg-background focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select role</option>
                <option value="mentee">Mentee</option>
                <option value="mentor">Mentor</option>
                <option value="user-union">user Union</option>
                <option value="admin">Admin</option>
              </select>
              {mutation.isPending && (
                <p className="text-xs text-blue-500 mt-1">Updating role...</p>
              )}
            </div>
          </div>
        </div>

        {/* Middle Column — Bio */}
        <div className="col-span-1 border-l border-foreground/20 pl-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Bio</h3>
            <p className="text-foreground/60">
              {bio || "No biography provided."}
            </p>
          </div>
        </div>

        {/* Right Column — Academic Overview */}
        <div className="col-span-1 border-l border-foreground/20 pl-8">
          <h3 className="text-xl font-semibold mb-3">Academic Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-foreground/60">
              <span>Department</span>
              <span className="font-medium text-foreground">{major}</span>
            </div>
            <div className="flex justify-between text-sm text-foreground/60">
              <span>Year</span>
              <span className="font-medium text-foreground">{year}</span>
            </div>
            <div className="flex justify-between text-sm text-foreground/60">
              <span>Role</span>
              <span className="font-medium text-foreground">{role}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessionDetail;
