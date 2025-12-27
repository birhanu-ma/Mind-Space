import mongoose from "mongoose";

const petitionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Petition must belong to a user"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: [100, "Subject cannot exceed 100 characters"],
    },
    body: {
      type: String,
      required: [true, "Petition description is required"],
      trim: true,
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
    reviewedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Populate user info on all find queries
petitionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email role photo",
  }).populate({
    path: "reviewedBy",
    select: "name email",
  });
  next();
});

const Petition = mongoose.model("Petition", petitionSchema);
export default Petition;