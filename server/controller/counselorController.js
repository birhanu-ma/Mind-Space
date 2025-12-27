import Application from "../model/counselorModel.js";
import Profession from "../model/professionalModel.js";
import * as factory from "./handlerFactory.js";
import Petition from "../model/petitionModel.js"
import catchAsync from "../utils/catchAsync.js";
import Counseling from "../model/counselingModel.js";
import AppError from "../utils/AppError.js";
import mongoose from "mongoose";
export const counselorCreatePetition = factory.createOne(Petition);
// Standard CRUD using factory
export const createApplication = factory.createOne(Application);
export const getApplication = factory.getOne(Application);
export const getAllApplications = factory.getAll(Application);
export const updateApplication = factory.updateOne(Application);
export const deleteApplication = factory.deleteOne(Application);


// controllers/applicationController.js (or wherever your review function is)



export const reviewApplications = catchAsync(async (req, res, next) => {
  const { status } = req.body; // "pending" | "approved" | "rejected"

  // Validate status
  if (!["pending", "approved", "rejected"].includes(status)) {
    return next(new AppError("Invalid status. Must be 'pending', 'approved', or 'rejected'.", 400));
  }

  // Find the application and populate user for convenience
  const application = await Application.findById(req.params.id).populate("user");

  if (!application) {
    return next(new AppError("Application not found", 404));
  }

  const user = application.user; // Populated user document

  // Prevent changing status if already processed (optional safety)
  if (application.status !== "pending" && status !== application.status) {
    return next(new AppError(`Application is already ${application.status}. Cannot change to ${status}.`, 400));
  }

  // Update application status
  application.status = status;
  await application.save();

  /* ===================== APPROVED ===================== */
  if (status === "approved") {
    // Check if Profession record already exists
    const existingProfession = await Profession.findOne({ application: application._id });

    if (!existingProfession) {
      await Profession.create({
        user: user._id,              // ← Direct reference to the counselor's User ID
        application: application._id,
        approvedBy: req.user._id,    // Admin who approved
        active: true,
      });
    }

    // Upgrade user role to "counselor" if not already
    if (user.role !== "counselor") {
      user.role = "counselor";
      await user.save();
    }
  }

  /* ===================== REJECTED ===================== */
  if (status === "rejected") {
    // Remove Profession record if exists
    await Profession.findOneAndDelete({ application: application._id });

    // Downgrade role back to "user" if it was counselor
    if (user.role === "counselor") {
      user.role = "user";
      await user.save();
    }
  }

  // Optional: re-populate fresh data
  await application.populate("user");

  res.status(200).json({
    status: "success",
    message: `Application has been ${status}.`,
    data: {
      application,
    },
  });
});
// Get applications by type / query
export const getApplicationsByType = async (req, res, next) => {
  try {
    const { applicationType, q, ...restQuery } = req.query;

    // Base query: filter by applicationType if provided
    let baseQuery = applicationType
      ? Application.find({ applicationType })
      : Application.find();

    // Apply additional filters, sort, pagination using APIFeatures
    const features = new APIFeatures(baseQuery, restQuery)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // Apply search query if provided
    if (q) {
      const regex = new RegExp(q, "i");
      features.query = features.query.find({
        $or: [{ name: regex }, { email: regex }],
      });
    }

    const applications = await features.query;

    res.status(200).json({
      status: "success",
      results: applications.length,
      data: applications,
    });
  } catch (err) {
    next(err);
  }
};


export const getMenteeDetailForCounselor = catchAsync(async (req, res, next) => {
  const { menteeId } = req.params;
  
  const counselorId = req.user?._id || req.params.counselorId; // Adjust based on your auth setup
  console.log("mentee params", req.params)

  // Validate menteeId
  if (!menteeId || !mongoose.Types.ObjectId.isValid(menteeId)) {
    return next(new AppError("Invalid mentee ID", 400));
  }

  // Find active counseling session where:
  // - mentee matches the requested ID
  // - counselor is the current logged-in counselor
  const counseling = await Counseling.findOne({
    mentee: menteeId,
    counselorUser: counselorId,
    active: true,
  }).populate({
    path: "mentee",
    select: "name email photo role createdAt", // Add more fields if needed
  });

  if (!counseling) {
    return next(
      new AppError("No active mentee found with that ID under your mentorship", 404)
    );
  }

  const mentee = counseling.mentee;

  res.status(200).json({
    status: "success",
    data: {
      mentee,
    },
  });
});