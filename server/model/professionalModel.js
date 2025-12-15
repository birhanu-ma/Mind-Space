import mongoose from "mongoose";

const professionalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true, // link to the User who is a professional
      unique: true,   // one professional record per user
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
    maxMentees: { type: String, default: "2" },
    avoidTopics: { type: [String], default: [] },
    canHandleCrisis: { type: String, enum: ["yes", "no"], default: "no" },
    comfortLevels: { type: Map, of: Number, default: {} },
    priorityFactor: {
      type: String,
      enum: ["personality", "supportArea", "communication", "availability", "experience"],
      default: "supportArea",
    },
    backgroundCheckStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Auto-populate User info
professionalSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email role",
  });
  next();
});

const Professional = mongoose.model("Professional", professionalSchema);
export default Professional;
