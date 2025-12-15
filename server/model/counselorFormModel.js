import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {

    professional: {
      type: mongoose.Schema.ObjectId,
      ref: "Professional",
      required: true, // reference to the Professional profile
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    approvedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      default: null,
    },
    active: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Auto-populate User and Professional
applicationSchema.pre(/^find/, function (next) {
  this.populate({
    select: "name email role",
  }).populate({
    path: "professional",
    // populate all professional fields
  });
  next();
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;
