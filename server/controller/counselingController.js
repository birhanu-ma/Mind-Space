import Counseling from "../model/counselingModel.js";
import mongoose from "mongoose";
import AppError from "../../server/utils/AppError.js";
import * as factory from "./handlerFactory.js";
import APIFeatures from "../utils/apiFeatures.js";
import CounselorModel from "../model/counselorModel.js";
import menteeModel from "../model/menteeModel.js";
import matchMenteesToCounselor from "../utils/match.js";
import catchAsync from "../utils/catchAsync.js";
import Profession from "../model/professionalModel.js";
import Mentee from "../model/menteeModel.js";
// controllers/counselingController.js


// ========== Standard CRUD ==========
export const getAllCounseling = factory.getAll(Counseling);
export const getCounseling = factory.getOne(Counseling);
export const deleteCounseling = factory.deleteOne(Counseling);

// ========== Create Counseling Session ==========
export const createCounseling = catchAsync(async (req, res, next) => {
  const { counselor: applicationId, mentee } = req.body; // mentee = User ID

  if (!applicationId || !mentee) {
    return next(new AppError("Counselor application ID and mentee ID are required", 400));
  }

  // Find active profession
  const profession = await Profession.findOne({
    application: applicationId,
    active: true,
  });

  if (!profession) {
    return next(new AppError("No active approved profession found for this counselor", 400));
  }

  // Prevent duplicate active session
  const existing = await Counseling.findOne({ mentee, active: true });
  if (existing) {
    return next(new AppError("This mentee already has an active counseling session", 400));
  }

  // Create new counseling
  const counseling = await Counseling.create({
    counselorUser: profession.user,
    counselorApplication: applicationId,
    mentee, // Direct User ID
    status: "scheduled",
    active: true,
    startDate: new Date(),
  });

  // Fetch populated version (pre(/^find/) hook runs)
  const populatedCounseling = await Counseling.findById(counseling._id);

  res.status(201).json({
    status: "success",
    message: "Counseling session created successfully",
    data: { counseling: populatedCounseling },
  });
});

// ========== Get Counselor for a Mentee ==========
export const getCounselorForMentee = catchAsync(async (req, res, next) => {
  const { menteeId } = req.params; // mentee's User ID

  if (!menteeId || !mongoose.Types.ObjectId.isValid(menteeId)) {
    return next(new AppError("Valid mentee ID is required", 400));
  }

  const counseling = await Counseling.findOne({
    mentee: menteeId,
    active: true,
  });

  if (!counseling) {
    return next(new AppError("No active counseling session found for this mentee", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      counseling: {
        _id: counseling._id,
        counselor: counseling.counselorUser,           // Populated User (name, photo, etc.)
        application: counseling.counselorApplication,  // Populated Application details
        status: counseling.status,
        startDate: counseling.startDate,
      },
    },
  });
});

// ========== Get All Mentees for a Counselor ==========
export const getMenteesForCounselor = catchAsync(async (req, res, next) => {
  const { counselorId } = req.params; // counselor's User ID
  const { q, ...queryParams } = req.query;

  if (!counselorId || !mongoose.Types.ObjectId.isValid(counselorId)) {
    return next(new AppError("Invalid counselor ID", 400));
  }

  let query = Counseling.find({
    counselorUser: counselorId,
    active: true,
  });

  const features = new APIFeatures(query, queryParams)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const counselings = await features.query;

  // mentee is directly populated User object
  let mentees = counselings.map((c) => c.mentee).filter(Boolean);

  // Search by name or email
  if (q) {
    const regex = new RegExp(q.trim(), "i");
    mentees = mentees.filter(
      (mentee) =>
        regex.test(mentee.name || "") ||
        regex.test(mentee.email || "")
    );
  }

  res.status(200).json({
    status: "success",
    results: mentees.length,
    data: { mentees },
  });
});

// ========== Get Counseling Stats for Counselor ==========
export const getCounselingStatsForCounselor = catchAsync(async (req, res, next) => {
  const { counselorId } = req.params;

  if (!counselorId || !mongoose.Types.ObjectId.isValid(counselorId)) {
    return next(new AppError("Valid counselor ID is required", 400));
  }

  // Assuming you have a static method on Counseling model
  const stats = await Counseling.getCounselingStats({ counselorUser: counselorId });

  if (!stats) {
    return next(new AppError("No stats found for this counselor", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      stats: {
        menteeCount: stats.menteeCount || 0,
        menteeDepartmentCounts: stats.menteeDepartmentCounts || {},
        menteeYearCounts: stats.menteeYearCounts || {},
        activeInactiveCounts: stats.activeInactiveCounts || { active: 0, inactive: 0 },
      },
    },
  });
});

// ========== Get Ranked Mentees for Matching (Admin) ==========
export const matchMentee = catchAsync(async (req, res, next) => {
  const { counselorId } = req.params;

  if (!counselorId || !mongoose.Types.ObjectId.isValid(counselorId)) {
    return next(new AppError("Valid counselor ID is required", 400));
  }

  const counselor = await CounselorModel.findById(counselorId);
  if (!counselor) {
    return next(new AppError("Counselor not found", 404));
  }

  // Get all mentees (or filter unassigned if needed)
  const mentees = await Mentee.find({});

  const rankedMentees = await matchMenteesToCounselor(counselor, mentees);

  res.status(200).json({
    status: "success",
    data: {
      counselorId: counselor._id,
      totalRankedMentees: rankedMentees.length,
      rankedMentees,
    },
  });
});