import mongoose from "mongoose";

const petitionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Petition owner (student) is required"],
  },
  subject: {
    type: String,
    required: [true, "Subject of the petition is required"],
    trim: true,
  },
  body: {
    type: String,
    required: [true, "Petition description/body is required"],
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

const Petition = mongoose.model("Petition", petitionSchema);

export default Petition;
