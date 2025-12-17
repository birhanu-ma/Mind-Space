import mongoose from "mongoose";
import User from "./userModel.js";
const MenteeSchema = new mongoose.Schema(
  {
    // Basic Profile
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "mentee is required"],
    },
    age: {
      type: Number,
    },

    // Support Needs
    supportAreas: {
      type: [String],
      default: [], // e.g., "Anxiety", "Academic Stress"
    },
    comfortLevel: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },

    // Goals
    primaryGoal: {
      type: String,
    },
    secondaryGoal: {
      type: String,
    },

    // Preferred Mentor Traits
    preferredMentorPersonality: {
      type: [String], // e.g., "Empathetic & Warm", "Structured & Goal-Oriented"
      default: [],
    },

    // Age preference for mentor
    agePreference: {
      type: String,
      enum: ["Any Age", "13-17", "18-24", "25-34", "35-44", "45+"],
      default: "Any Age",
    },

    // Topics to Avoid / Boundaries
    avoidTopics: {
      type: String,
      default: "",
    },

    // Matching Preferences
    priorityFactor: {
      type: String,
      enum: ["personality", "supportArea", "availability", "communication"],
      default: "supportArea",
    },
    communication: {
      type: String,
      enum: ["text", "voice", "video", "message"],
      default: "text",
    },

    // Availability
    availability: {
      type: String, // free-text like "Weekdays after 6pm"
      default: "",
    },

    // Additional metadata
    createdAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

MenteeSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email role createdAt",
  });
  next();
});

const Mentee = mongoose.model("Mentee", MenteeSchema);
export default Mentee;
