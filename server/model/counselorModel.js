import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Application must belong to a user"],
      unique: true,
    },
    profession: {
      type: String,
      required: [true, "Profession is required"],
      trim: true,
    },
    degreeLevel: { type: String, default: "" },
    certifications: [{ type: String }],
    supportAreas: { type: [String], default: [] },
    mentalHealthSpecialties: { type: [String], default: [] },
    personalityStyle: { type: [String], default: [] },
    communicationStyles: { type: [String], default: [] },
    availability: { type: String, default: "" },
    timezone: { type: String, default: "" },
    preferredMenteeGoals: { type: [String], default: [] },
    menteeAgePreference: { type: String, default: "Any" },
    maxMentees: {
      type: Number,
      default: 2,
      min: [1, "Must accept at least 1 mentee"],
    },
    avoidTopics: { type: [String], default: [] },
    canHandleCrisis: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    comfortLevels: { type: Map, of: Number, default: {} },
    priorityFactor: {
      type: String,
      enum: ["personality", "supportArea", "communication", "availability", "experience"],
      default: "supportArea",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Auto-populate user details
applicationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email role photo",
  });
  next();
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;