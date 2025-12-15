import mongoose from "mongoose";

const petitionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Petition owner is required"],
  },
  subject: { type: String, required: [true, "Subject is required"], trim: true },
  body: { type: String, required: [true, "Petition body is required"] },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  reviewedBy: { type: mongoose.Schema.ObjectId, ref: "User", default: null },
  createdAt: { type: Date, default: Date.now },
});

petitionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email role active",
  });
  next();
});

const Petition = mongoose.model("Petition", petitionSchema);
export default Petition;
