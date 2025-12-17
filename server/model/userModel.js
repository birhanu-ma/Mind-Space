import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Invalid email"],
  },

  role: {
    type: String,
    enum: ["user", "mentee", "counselor", "admin"],
    default: "user",
  },

  photo: {
    type: String,
    default: "default.jpeg",
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: true,
    select: false,
  },

  active: {
    type: Boolean,
    default: true,
    select: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});




// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// Compare passwords
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Check if password changed after JWT issued
userSchema.methods.changedPasswordAfter = function (jwtTimeStamp) {
  if (this.passwordChangedAt) {
    const changedAt = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return changedAt > jwtTimeStamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);
export default User;
