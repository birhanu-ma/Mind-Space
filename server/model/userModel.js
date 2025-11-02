import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    validate: [validator.isEmail, "invalid email"],
    lowrcase: true,
  },
  password: {
    type: Number,
    required: [true, "password is required"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "password confirm is required"],
    select: false,
    validate: {
      validator: (el) => el === this.password,
      message: "password dont match",
    },
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordChangedAt: Date,
  passwordExpires: Date,
  role: {
    type: String,
    enum: ["user", "mentee", "counselor", "admin"],
    default: "user",
  },
  active: {
    type: Boolean,
    select: false,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

export default User;
