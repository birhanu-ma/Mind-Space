import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MdModeEdit } from "react-icons/md";
import { profileAPI } from "../../service/client";

const Profile = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: profileAPI.getProfile,
  });

  const updateNameMutation = useMutation({
    mutationFn: profileAPI.updateProfile,
    onSuccess: () => queryClient.invalidateQueries(["profile"]),
  });

  const updatePhotoMutation = useMutation({
    mutationFn: profileAPI.updateProfilePhoto,
    onSuccess: () => queryClient.invalidateQueries(["profile"]),
  });

  const profile = data?.data?.user;
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (profile?.name) setName(profile.name);
  }, [profile?.name]);

  if (isLoading) return <p className="py-20 text-center">Loading...</p>;
  if (isError) return <p className="py-20 text-center text-red-500">Failed to load profile</p>;
  if (!profile) return <p className="py-20 text-center">No profile found</p>;

  const handleNameSave = () => {
    if (!name.trim() || name === profile.name) {
      setEditing(false);
      return;
    }
    updateNameMutation.mutate({ name: name.trim() });
    setEditing(false);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("photo", file);
    updatePhotoMutation.mutate(formData);
  };

  return (
    /* 1. overflow-x-hidden on wrapper is mandatory */
    <div className="min-h-screen py-24 px-4 flex justify-center bg-gray-50 overflow-x-hidden box-border">
      
      {/* 2. Added max-w-[calc(100vw-32px)] to ensure the box NEVER exceeds screen width */}
      <section className="flex flex-col items-center gap-6 border rounded-lg p-6 shadow-sm bg-white w-full max-w-[calc(100vw-32px)] sm:max-w-md h-fit">
        
        {/* Profile Photo */}
        <div className="relative flex-shrink-0">
          <img
            src={`https://mind-space-atfn.onrender.com/img/users/${profile.photo || "default.jpeg"}`}
            alt="Profile"
            className="h-24 w-24 rounded-full object-cover border"
          />
          <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 shadow-md">
            <MdModeEdit className="text-white text-sm" />
            <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
          </label>
        </div>

        {/* Profile Info - Fixed horizontal expansion */}
        <div className="flex flex-col w-full text-center overflow-hidden">
          <div className="flex flex-col items-center gap-2 w-full">
            {editing ? (
              <div className="flex flex-col gap-2 w-full">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded px-3 py-2 text-base w-full focus:ring-2 focus:ring-blue-500 outline-none"
                  autoFocus
                />
                <button
                  onClick={handleNameSave}
                  disabled={updateNameMutation.isLoading}
                  className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
                >
                  {updateNameMutation.isLoading ? "Saving..." : "Save Name"}
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 w-full">
                {/* 3. Added truncate to the H1 to prevent long names from pushing the border out */}
                <h1 className="text-xl font-bold text-gray-900 truncate max-w-[200px]">
                  {profile.name}
                </h1>
                <button
                  onClick={() => setEditing(true)}
                  className="text-gray-400 hover:text-blue-600"
                >
                  <MdModeEdit size={18} />
                </button>
              </div>
            )}
          </div>

          {/* 4. break-all on email is critical for mobile */}
          <p className="text-gray-500 text-sm mt-1 break-all px-2">
            {profile.email}
          </p>

          <div className="mt-4">
            <span className="inline-block text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600 font-bold uppercase tracking-wider">
              {profile.role}
            </span>
          </div>

          {updatePhotoMutation.isLoading && (
            <p className="text-xs text-blue-600 mt-3 animate-pulse">Uploading photo...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Profile;