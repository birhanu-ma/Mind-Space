import Counseling from "../model/counselingModel.js";
import mongoose from "mongoose";
import AppError from "../../server/utils/AppError.js";
import * as factory from "./handlerFactory.js";
import APIFeatures from "../utils/apiFeatures.js";
import CounselorModel from "../model/counselorModel.js"
import menteeModel from "../model/menteeModel.js"
import matchMenteesToCounselor from "../utils/match.js";


// Standard CRUD using factory handlers
export const createCounseling = factory.createOne(Counseling);
export const getAllCounseling = factory.getAll(Counseling);
export const getCounseling = factory.getOne(Counseling);
export const deleteCounseling = factory.deleteOne(Counseling);


// Get counseling for a given mentee
export const getCounselorForMentee = async (req, res, next) => {
  try {
 
    const { menteeId } = req.params;
       console.log("this is mentee id", menteeId)
    if (!menteeId) {
      return next(
        new AppError(
          "Mentee ID is missing or invalid; this mentee may not have a counseling assigned",
          400
        )
      );
    }

    const counseling = await Counseling.findOne({ mentee: menteeId });
    console.log("this is a counseling data", counseling)
    if (!counseling) {
      return next(
        new AppError("No counseling assigned to this mentee yet", 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        counselor: counseling.counselor,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Get mentees assigned to a counseling with optional search/filter
export const getMenteesForCounselor = async (req, res, next) => {

  try {
    const {counselorId} = req.params;
    const { q, ...restQuery } = req.query;

    if (!counselorId) {
      return res.status(400).json({ message: "Invalid counseling ID" });
    }

    const counselingObjectId = new mongoose.Types.ObjectId(counselorId);

    // Base query
    let baseQuery = Counseling.find({
      counselor: counselingObjectId,
    }).populate("mentee");

    // Apply filtering, sorting, field limiting, pagination
    const features = new APIFeatures(baseQuery, restQuery)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    let Counselings = await features.query;

    let mentees = Counselings.flatMap((m) => m.mentee).filter(Boolean);
    console.log("this is mentee list", mentees)

    if (q) {
      const searchRegex = new RegExp(q, "i");
      mentees = mentees.filter(
        (s) => searchRegex.test(s.name) || searchRegex.test(s.sims_id)
      );
    }

    res.status(200).json({
      status: "success",
      results: mentees.length,
      data: { mentees },
    });
  } catch (err) {
    console.error("Fetch mentee error:", err);
    res.status(400).json({ status: "fail", message: err.message });
  }
};

export const getCounselingStatsForCounselor = async (req, res, next) => {
  try {
    const counselorId = req.params?.counselorId;
    if (!counselorId) {
      return res.status(400).json({ message: "Invalid counseling ID" });
    }

    const stats = await Counseling.getCounselingStats({
      counseling: counselorId,
    });

    res.status(200).json({
      status: "success",
      stats: {
        menteeCount: stats?.menteeCount || {},
        menteeDepartmentCounts: stats?.menteeDepartmentCounts || {},
        menteeYearCounts: stats?.menteeYearCounts || {},
        activeInactiveCounts: stats?.activeInactiveCounts || {},
      },
    });
  } catch (err) {
    console.error("Error fetching mentee stats:", err);
    next(err);
  }
};






// GET ranked mentees for admin

export const matchMentee = async (req, res, next) => {
  try {
    const counselor = await CounselorModel.findById(req.params.counselorId);
    if (!counselor) {
      return res.status(404).json({ message: "Counselor not found" });
    }

    // Only get unassigned mentees (optional, still filtered in ranking function)
    const mentees = await menteeModel.find({});

    const rankedMentees = await matchMenteesToCounselor(counselor, mentees);

    res.status(200).json({
      status: "success",
      counselorId: counselor._id,
      totalMentees: rankedMentees.length,
      rankedMentees,
    });
  } catch (err) {
    next(err);
  }
};

