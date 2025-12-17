import mongoose from "mongoose";

const moodEntrySchema = new mongoose.Schema(
  {
    // Who logged the mood
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Date of the entry (YYYY-MM-DD)
    date: {
      type: Date,
      required: true,
    },

    // Mood selected
    mood: {
      type: String,
      enum: ["happy", "sad", "neutral", "anxious", "angry"],
      required: true,
    },

    // Optional notes
    notes: {
      type: String,
      trim: true,
      default: "",
    },

    // Activity level
    activity_level: {
      type: String,
      enum: ["low", "moderate", "high"],
      required: true,
    },

    // Sleep duration in hours
    sleep_hours: {
      type: Number,
      min: 0,
      max: 24,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

/* -------------------------------------------------
   Prevent duplicate entries per user per day
------------------------------------------------- */
moodEntrySchema.index({ user: 1, date: 1 }, { unique: true });

const MoodEntry = mongoose.model("MoodEntry", moodEntrySchema);
export default MoodEntry;
