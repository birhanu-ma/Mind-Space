import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MdModeEdit } from "react-icons/md";
import { profileAPI } from "../../service/client";

const Profile = () => {
  const queryClient = useQueryClient();

  // Fetch profile
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: profileAPI.getProfile,
  });

  // Mutations
  const updateNameMutation = useMutation({
    mutationFn: profileAPI.updateProfile,
    onSuccess: () => queryClient.invalidateQueries(["profile"]),
  });

  const updatePhotoMutation = useMutation({
    mutationFn: profileAPI.updateProfilePhoto,
    onSuccess: () => queryClient.invalidateQueries(["profile"]),
  });

  // Profile data
  const profile = data?.data?.user;

  // Local state for editing name
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  // Sync name when profile loads
  useEffect(() => {
    if (profile?.name) setName(profile.name);
  }, [profile?.name]);

  if (isLoading) return <p className="py-20 text-center">Loading...</p>;
  if (isError)
    return (
      <p className="py-20 text-center text-red-500">Failed to load profile</p>
    );
  if (!profile) return <p className="py-20 text-center">No profile found</p>;

  // Save name
  const handleNameSave = () => {
    if (!name.trim() || name === profile.name) {
      setEditing(false);
      return;
    }
    updateNameMutation.mutate({ name: name.trim() });
    setEditing(false);
  };

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    updatePhotoMutation.mutate(formData);
  };

  return (
    <div className="py-20 min-h-screen flex justify-center bg-gray-50">
      <section className="w-full max-w-3xl flex gap-6 border rounded-lg p-6 shadow-sm bg-white">
        {/* Profile Photo */}
        <div className="relative">
          <img
            src={`http://localhost:5000/img/users/${
              profile.photo || "default.jpeg"
            }`}
            alt="Profile"
            className="h-24 w-24 rounded-full object-cover border"
          />

          {/* Edit Photo Button */}
          <label className="absolute bottom-0 right-0 bg-blue-600 p-1.5 rounded-full cursor-pointer hover:bg-blue-700">
            <MdModeEdit className="text-white text-sm" />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </label>

          {updatePhotoMutation.isLoading && (
            <p className="text-sm text-gray-500 mt-1 text-center">
              Uploading...
            </p>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2">
            {editing ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-3 py-1 text-lg w-full"
              />
            ) : (
              <h1 className="text-2xl font-semibold">{profile.name}</h1>
            )}

            {/* Edit Icon */}
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="text-gray-600 hover:text-blue-600"
              >
                <MdModeEdit />
              </button>
            )}
            {/* Save Button */}
            {editing && (
              <button
                onClick={handleNameSave}
                disabled={updateNameMutation.isLoading}
                className=" bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {updateNameMutation.isLoading ? "Saving..." : "Save"}
              </button>
            )}
          </div>

          <p className="text-gray-600 mt-1">{profile.email}</p>

          <span className="inline-block mt-2 w-fit text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700">
            {profile.role}
          </span>

          {/* Updating indicator */}
          {(updateNameMutation.isLoading || updatePhotoMutation.isLoading) &&
            !editing && (
              <p className="text-sm text-gray-400 mt-2">Updating...</p>
            )}
        </div>
      </section>
    </div>
  );
};

export default Profile;
