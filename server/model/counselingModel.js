import mongoose from "mongoose";

const counselingSchema = new mongoose.Schema({
  counselor: {
    type: mongoose.Schema.ObjectId,
    ref: "Professional",
    required: [true, "Counselor is required"], // reference Professional
  },
  mentee: {
    type: mongoose.Schema.ObjectId,
    ref: "Mentee",
    required: [true, "Mentee is required"], // reference Mentee
  },
  reviewedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: Date,
  active: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    enum: ["scheduled", "in-progress", "completed", "cancelled"],
    default: "scheduled",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure one mentee can have only one active counseling session
counselingSchema.index({ mentee: 1 }, { unique: true });

// Auto-populate Professional (all fields + nested User) and Mentee
counselingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "counselor",
    populate: { path: "user", select: "name email role" }, // nested User inside Professional
  }).populate({
    path: "mentee",
    populate: { path: "user", select: "name email role createdAt" }, // nested User inside Mentee
  });
  next();
});

const Counseling = mongoose.model("Counseling", counselingSchema);
export default Counseling;
