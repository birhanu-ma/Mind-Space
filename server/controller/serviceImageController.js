import multer from "multer";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import Service from "../model/serviceModel.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload directory
const UPLOAD_DIR = path.join(__dirname, "../", "public", "img", "services");
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

export const uploadServiceImage = upload.single("image");

export const processAndSaveServiceImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `service-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(800, 600, { fit: "cover" })
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.join(UPLOAD_DIR, req.file.filename));
  req.body.image = req.file.filename;  // ← This is perfect
  next();
});

export const addOrUpdateServiceImage = catchAsync(async (req, res, next) => {
  if (!req.body.image) return next(new AppError("No image provided", 400));
  const service = await Service.findById(req.params.id);
  if (!service) return next(new AppError("Service not found", 404));

  const oldImage = service.image;
  service.image = req.body.image;
  await service.save({ validateBeforeSave: false });

  if (oldImage) {
    const oldPath = path.join(UPLOAD_DIR, oldImage);
    try { await fs.promises.unlink(oldPath); } 
    catch (err) { console.error("Error deleting old image:", err.message); }
  }

  res.status(200).json({
    status: "success",
    message: "Service image updated successfully",
    data: { service },
  });
});