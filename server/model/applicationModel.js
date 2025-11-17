import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  applicant: {
    type:String
    // type: mongoose.Schema.ObjectId,
    // ref: "User",
    // required: [true, "Applicant is required"],
    // unique: true, // ensures one application per user
  },
  motivation: {
    type: String,
    required: [true, "Application body is required"],
  },
  experience: {
    // typo: "exeperience"
    type: String,
    required: [true, "Mentor experience is required"],
  },
  communication: {
    type: Number,
    required: [true, "Communication level is required"],
    min: [1, "Minimum level is 1"],
    max: [10, "Maximum level is 10"],
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
    default: Date.now,
  },
});

const Application = mongoose.model("Application", applicationSchema);
export default Application;
