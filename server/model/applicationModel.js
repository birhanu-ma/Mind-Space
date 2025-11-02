import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
  applicant: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Applicant is required"],
    unique: true,
  },
  motivation: {
    type: String,
    required: [true, "application body is required"],
  },
  exeperience: {
    type: String,
    require: [true, "mentor experience is required"],
  },
  communication: {
    type: Number,
    require: [true, "communication leve is required"],
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  reviewedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Application = mongoose.model("Application", applicationSchema);
export default Application
