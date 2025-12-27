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

// Auto-populate user, application (with its profession and other details), and approvedBy
professionSchema.pre(/^find/, function (next) {
  this.populate([
    {
      path: "user",
      select: "name email photo role createdAt",
    },
    {
      path: "application",
      select: [
        "profession",                    // <-- Key addition: include profession
        "degreeLevel",
        "certifications",
        "supportAreas",
        "mentalHealthSpecialties",
        "personalityStyle",
        "communicationStyles",
        "availability",
        "timezone",
        "preferredMenteeGoals",
        "menteeAgePreference",
        "maxMentees",
        "avoidTopics",
        "canHandleCrisis",
        "comfortLevels",
        "priorityFactor",
      ].join(" "),
      // Also populate the user inside application for convenience (e.g., name/photo)
      populate: {
        path: "user",
        select: "name photo role",
      },
    },
    {
      path: "approvedBy",
      select: "name email photo role",
    },
  ]);

  next();
});

const Profession = mongoose.model("Profession", professionSchema);
export default Profession;