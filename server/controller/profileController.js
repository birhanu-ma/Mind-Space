import User from "../model/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

// ✅ Get current user
export const getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password -passwordConfirm");
  if (!user) return next(new AppError("User not found", 404));

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

export const updateMyDetails = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new AppError("Only name can be updated", 400));
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,   // ✅ from JWT, NOT frontend
    { name },
    { new: true, runValidators: true }
  ).select("-password -passwordConfirm");

  res.status(200).json({
    status: "success",
    data: { user: updatedUser },
  });
});
