// model/serviceModel.js
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  header: {
    type: String,
    required: [true, "Service header is required"],
    trim: true,
  },
  serviceType: {
    type: String,
    required: [true, "Service type is required"],
    enum: ["internal", "external"],
    default: "internal",
  },
  image: {  // ← Changed from 'img' to 'image' for consistency
    type: String,
    default: null,
  },
  paragraph: {
    type: String,
    required: [true, "Description paragraph is required"],
    trim: true,
  },
}, {
  timestamps: true,
});

const Service = mongoose.model("Service", serviceSchema);
export default Service;