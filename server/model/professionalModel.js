import mongoose from "mongoose";

const professionalSchema = new mongoose.Schema(
  {
    // user: {
    //   type: String,
    // //   ref: "User",
    //   required: true, 
    // },
    user:{
      type:String
    },

    profession: {
      type: String,
      required: [true, "Profession is required"], 
    },
    aboutYou:{
      type:String
    },
    specialization: {
      type: [String],
      default: [], 
    },

    experienceYears: {
      type: Number,
      default: 0,
    },

    servicesOffered: {
      type: [String],
      default: [],
    },

    profileImage: {
      type: String, 
      default: "",
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Professional = mongoose.model("Professional", professionalSchema);
export default Professional;
