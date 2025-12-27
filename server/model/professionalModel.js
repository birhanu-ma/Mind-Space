// models/Profession.js
import mongoose from "mongoose";

const professionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Profession must belong to a user (counselor)"],
      unique: true, // One profession record per counselor user
    },
    application: {
      type: mongoose.Schema.ObjectId,
      ref: "Application",
      required: [true, "Profession must reference an approved application"],
      unique: true,
    },
    approvedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Must specify who approved this counselor"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Auto-populate everything useful
professionSchema.pre(/^find/, function (next) {
  this.populate([
    {
      path: "user",
      select: "name email photo role createdAt",
    },
    {
      path: "application",
      select: "degreeLevel certifications supportAreas mentalHealthSpecialties personalityStyle communicationStyles availability timezone maxMentees canHandleCrisis priorityFactor",
      populate: {
        path: "user",
        select: "name photo", // redundant but safe if needed elsewhere
      },
    },
    {
      path: "approvedBy",
      select: "name email photo",
    },
  ]);

  next();
});

const Profession = mongoose.model("Profession", professionSchema);
export default Profession;