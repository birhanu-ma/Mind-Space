import mongoose from "mongoose";

const professionSchema = new mongoose.Schema(
  {
    profession: {
      type: mongoose.Schema.ObjectId,
      ref: "Application",
      required: true,
      unique: true, // one profession per application
    },
    approvedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Auto-populate application + user
professionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "profession", // ✅ correct
    populate: {
      path: "user",
      select: "name email role",
    },
  });
  next();
});


const Profession = mongoose.model("Profession", professionSchema);
export default Profession;
