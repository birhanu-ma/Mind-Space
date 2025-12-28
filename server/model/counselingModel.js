// models/Counseling.js
import mongoose from "mongoose";

const counselingSchema = new mongoose.Schema({
  counselorUser: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Counselor user is required"],
  },
  counselorApplication: {
    type: mongoose.Schema.ObjectId,
    ref: "Application",
    required: [true, "Counselor application is required"],
  },
  mentee: {
    type: mongoose.Schema.ObjectId,
    ref: "User",  // Direct reference to the User's document (mentee is a user with role: "mentee")
    required: [true, "Mentee user is required"],
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

// Ensure only one active counseling session per mentee
counselingSchema.index(
  { mentee: 1, active: 1 },
  {
    unique: true,
    partialFilterExpression: { active: true },
  }
);

// Auto-populate relevant fields on all find queries
counselingSchema.pre(/^find/, function (next) {
  this.populate([
    {
      path: "counselorUser",
      select: "name email photo role",
    },
    {
      path: "counselorApplication",
      select:
        "degreeLevel certifications supportAreas timezone maxMentees personalityStyle communicationStyles",
      populate: {
        path: "user",
        select: "name photo", // Redundant but safe if needed elsewhere
      },
    },
    {
      path: "mentee",
      select: "name email photo role createdAt", // ← Direct User fields — NO nested .user!
    },
    {
      path: "reviewedBy",
      select: "name email photo",
    },
  ]);
  next();
});

const Counseling = mongoose.model("Counseling", counselingSchema);

export default Counseling;