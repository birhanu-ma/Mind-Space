import mongoose from "mongoose";

const counselingSchema = mongoose.Schema({
  counselor: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  mentee: {
    type: mongoose.Schema.ObjectId,
    tef: "User",
  },
  reviewedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Counselling = mongoose.model("Counselling", counselingSchema);
export default Counselling;
