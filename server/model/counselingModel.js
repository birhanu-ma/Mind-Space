import mongoose from "mongoose";

const counselingSchema = new mongoose.Schema({
  counselor: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Counselor is required"],
  },
  mentee: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Mentee is required"],
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
  endDate: {
    type: Date,
  },
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

const Counseling = mongoose.model("Counseling", counselingSchema);
export default Counseling;
