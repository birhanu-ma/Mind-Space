import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
  header: {
    type: String,
    required: [true, "service header is required"],
  },
  serviceType: {
    type: String,
    required: [true, "service type is required"],
    enum: ["internal", "external"],
    default: "internal",
  },
  img: {
    type: String,
  },
  paragraph: {
    type: String,
    required: [true, "paragraph is required"],
  },
});

const Service = mongoose.model("Service", serviceSchema);
export default Service;
