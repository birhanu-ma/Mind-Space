
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { serviceAPI } from "../../service/client"; // ← Make sure this exists

function ServiceCreateForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      header: "",
      serviceType: "internal",
      img: "",
      paragraph: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: serviceAPI.createService, // POST /api/v1/services
    onSuccess: () => {
      toast.success("✅ Service created successfully!");
      reset();
    },
    onError: (error) => {
      toast.error(
        `Failed to create service: ${
          error.response?.data?.message || error.message
        }`
      );
    },
  });

  const onSubmit = (data) => {
    mutate(data);
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
              Create New Service
            </h2>
            <p className="text-foreground/60">
              Fill in the details below to publish a new service
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
                minLength: { value: 3, message: "Minimum 3 characters" },
              })}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Service title..."
            />
            {errors.header && (
              <p className="text-red-500 text-sm mt-1">
                {errors.header.message}
              </p>
            )}
          </div>

          {/* Service Type */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Service Type <span className="text-red-500">*</span>
            </label>
            <select
              {...register("serviceType", { required: "Service type is required" })}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg"
            >
              <option value="internal">Internal</option>
              <option value="external">External</option>
            </select>
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

          {/* Paragraph */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Paragraph <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("paragraph", {
                required: "Paragraph is required",
              })}
              rows={6}
              className="w-full border border-border bg-background text-foreground px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Write the service description..."
            />
            {errors.paragraph && (
              <p className="text-red-500 text-sm mt-1">
                {errors.paragraph.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting || isLoading ? "Publishing..." : "Publish Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ServiceCreateForm;
