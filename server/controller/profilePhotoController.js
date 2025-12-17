import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import User from "../model/userModel.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload directory
const UPLOAD_DIR = path.join(__dirname, "../..", "public", "img", "users");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Multer setup
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new AppError("Not an image! Please upload an image file.", 400), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export const uploadUserPhoto = upload.single("photo");

// Process and save photo
export const processAndSaveProfilePhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500, { fit: "cover" })
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.join(UPLOAD_DIR, req.file.filename));

  req.body.photo = req.file.filename;
  next();
});

// Add or update photo
export const addOrUpdatePhoto = catchAsync(async (req, res, next) => {
  if (!req.body.photo) return next(new AppError("No photo to update", 400));

  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) return next(new AppError("User not found", 404));

  const oldPhoto = user.photo;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { photo: req.body.photo },
    { new: true, runValidators: true }
  ).select("-password -passwordConfirm");

  // Delete old photo if not default
  if (oldPhoto && oldPhoto !== "default.jpeg") {
    const oldFilePath = path.join(UPLOAD_DIR, oldPhoto);
    try {
      await fs.promises.unlink(oldFilePath);
    } catch (err) {
      console.error("⚠️ Error deleting old photo:", err.message);
    }
  }

  res.status(200).json({
    status: "success",
    message: "Profile photo updated successfully",
    data: { user: updatedUser },
  });
});
