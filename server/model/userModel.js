import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

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
    type: String,
    required: [true, "password is required"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "password confirm is required"],
    select: false,
    validate: {
      validator: function (el) {
        return el === this.password;
      },

      message: "password are not the same",
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (jwtTimeStamp) {
  if (jwtTimeStamp) {
    const changedAt = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return changedAt > jwtTimeStamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

export default User;
