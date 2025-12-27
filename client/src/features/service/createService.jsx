// components/ServiceCreateForm.jsx
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { serviceAPI } from "../../service/client";
import { useState } from "react";

function ServiceCreateForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      header: "",
      serviceType: "internal",
      paragraph: "",
    },
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => serviceAPI.createService(formData),
    onSuccess: () => {
      toast.success("✅ Service created successfully!");
      reset();
      setImagePreview(null);
      setSelectedFile(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create service");
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("header", data.header);
    formData.append("serviceType", data.serviceType);
    formData.append("paragraph", data.paragraph);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    mutate(formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }

    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="py-20">
      <div className="max-w-3xl mx-auto px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border rounded-xl p-8 space-y-6 bg-white shadow-lg"
        >
          <h2 className="text-3xl font-bold text-center">Create New Service</h2>

          {/* Header */}
          <div>
            <label className="block font-semibold mb-2">Service Header *</label>
            <input
              {...register("header", {
                required: "Header is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
              })}
              className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter service title..."
            />
            {errors.header && <p className="text-red-500 text-sm mt-1">{errors.header.message}</p>}
          </div>

          {/* Service Type */}
          <div>
            <label className="block font-semibold mb-2">Service Type *</label>
            <select
              {...register("serviceType", { required: "Service type is required" })}
              className="w-full border px-4 py-3 rounded-lg"
            >
              <option value="internal">Internal</option>
              <option value="external">External</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-semibold mb-2">Service Image (Optional)</label>
            <label
              htmlFor="service-image"
              className="block h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer hover:border-blue-500 transition"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500 text-lg">Click to upload image</span>
              )}
            </label>
            <input
              id="service-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {selectedFile && (
              <p className="text-sm text-gray-600 mt-2">Selected: {selectedFile.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-2">Description *</label>
            <textarea
              {...register("paragraph", {
                required: "Description is required",
                minLength: { value: 20, message: "Minimum 20 characters" },
              })}
              rows={6}
              className="w-full border px-4 py-3 rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write a detailed description..."
            />
            {errors.paragraph && <p className="text-red-500 text-sm mt-1">{errors.paragraph.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50 transition"
          >
            {isPending ? "Publishing..." : "Publish Service"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ServiceCreateForm;