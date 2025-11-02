import mongoose from "mongoose";

const petitionSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "petition address is needed"],
  },

  subject: {
    type: String,
    required: [true, "subject petition is required"],
  },
  body: {
    type: String,
    required: [true, "body or description to petition is required"],
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

const Petition = mongoose.model("Petition", petitionSchema);
export default Petition;
