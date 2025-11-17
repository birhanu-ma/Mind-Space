import Counseling from "../model/counselingModel.js"
import mongoose from "mongoose";
import AppError from "../../server/utils/AppError.js";
import * as factory from "./handlerFactory.js";
import APIFeatures from "../../server/utils/AppError.js";


// Standard CRUD using factory handlers
export const createCounseling = factory.createOne(Counseling);
export const getAllCounseling = factory.getAll(Counseling);
export const getCounseling = factory.getOne(Counseling);
export const deleteCounseling = factory.deleteOne(Counseling);

// Get mentor for a given mentee
export const getCounselorForMentee = async (req, res, next) => {
  try {
    const { menteeId } = req.params;
    if (!menteeId) {
      return next(
        new AppError(
          "Mentee ID is missing or invalid; this mentee may not have a mentor assigned",
          400
        )
      );
    }

    const Counseling = await Counseling.findOne({ mentee: menteeId });
    if (!Counseling) {
      return next(new AppError("No mentor assigned to this mentee yet", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        mentor: Counseling.mentor,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Get mentees assigned to a mentor with optional search/filter
export const getMenteesForCounselor = async (req, res, next) => {
  try {
    const { mentorId, q, ...restQuery } = req.query;

    if (!mentorId) {
      return res.status(400).json({ message: "Invalid mentor ID" });
    }

    const mentorObjectId = new mongoose.Types.ObjectId(mentorId);

    // Base query
    let baseQuery = Counseling.find({ mentor: mentorObjectId }).populate(
      "mentee"
    );

    // Apply filtering, sorting, field limiting, pagination
    const features = new APIFeatures(baseQuery, restQuery)
      .filter()
      .sort()
      .limitFields()
      .pagination();
    let Counselings = await features.query;

    let mentees = Counselings.flatMap((m) => m.mentee).filter(Boolean);

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
    const mentorId = req.params?.mentorId;
    if (!mentorId) {
      return res.status(400).json({ message: "Invalid mentor ID" });
    }

    const stats = await Counseling.getCounselingStats({ mentor: mentorId });

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
