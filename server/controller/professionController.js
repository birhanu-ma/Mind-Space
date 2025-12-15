import Application from "../model/counselorModel.js";
import APIFeatures from "../utils/apiFeatures.js";

// GET /api/professions
export const getAllProfessions = async (req, res, next) => {
  try {
    const baseQuery = Application.find({ status: "approved" });

    const features = new APIFeatures(baseQuery, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const professions = await features.query;

    res.status(200).json({
      status: "success",
      results: professions.length,
      data: professions,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/professions/by-type?professionType=xxx
export const getProfessionsByType = async (req, res, next) => {
  try {
    const { professionType, q, ...restQuery } = req.query;

    let baseQuery = Application.find({ status: "approved" });
    if (professionType) baseQuery = baseQuery.find({ professionType });

    const features = new APIFeatures(baseQuery, restQuery)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    if (q) {
      const regex = new RegExp(q, "i");
      features.query = features.query.find({
        $or: [{ profession: regex }, { "user.name": regex }],
      });
    }

    const professions = await features.query;

    res.status(200).json({
      status: "success",
      results: professions.length,
      data: professions,
    });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/professions/:id
export const updateProfession = async (req, res, next) => {
  try {
    const profession = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!profession) {
      return res.status(404).json({
        status: "fail",
        message: "Application not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: profession,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/professions/:id
export const getProfessionDetails = async (req, res, next) => {
  try {
    const profession = await Application.findOne({
      _id: req.params.id,
      status: "approved",
    }).populate({
      path: "user",
      select: "name email role createdAt",
    });

    if (!profession) {
      return res.status(404).json({
        status: "fail",
        message: "Professional not found or not approved",
      });
    }

    res.status(200).json({
      status: "success",
      data: profession,
    });
  } catch (err) {
    next(err);
  }
};
