// models/applicationModel.js
import mongoose from "mongoose";
import User from "./userModel.js";
const applicationSchema = new mongoose.Schema(
  {
    // Reference to the user who submitted the application
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // ensures one application per user
    },

    // Mentor Age
    mentorAge: {
      type: Number,
      required: false,
    },

    // Professional Information
    profession: {
      type: String,
      required: true,
    },
    degreeLevel: {
      type: String,
      default: "",
    },
    experienceYears: {
      type: Number,
      required: true,
    },
    certifications: [
      {
        type: String,
      },
    ],

    // Expertise Areas
    supportAreas: {
      type: [String],
      default: [],
    },
    mentalHealthSpecialties: {
      type: [String],
      default: [],
    },

    // Mentor Personality Style
    personalityStyle: {
      type: [String],
      default: [],
    },

    // Communication Preferences
    communicationStyles: {
      type: [String],
      default: [],
    },

    // Availability & timezone
    availability: {
      type: String,
      default: "",
    },
    timezone: {
      type: String,
      default: "",
    },

    // Matching Metadata
    preferredMenteeGoals: {
      type: [String],
      default: [],
    },
    menteeAgePreference: {
      type: String,
      default: "Any",
    },
    maxMentees: {
      type: String,
      default: "2",
    },

    // Avoid Topics
    avoidTopics: {
      type: [String],
      default: [],
    },

    // Crisis Support
    canHandleCrisis: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },

    // Comfort Levels
    comfortLevels: {
      type: Map,
      of: Number,
      default: {},
    },

    // Additional Fields
    bio: {
      type: String,
      default: "",
    },
    priorityFactor: {
      type: String,
      enum: [
        "personality",
        "supportArea",
        "communication",
        "availability",
        "experience",
      ],
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

// --------------------------
// Auto-populate user info
// --------------------------
applicationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email role createdAt",
  });
  next();
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;
