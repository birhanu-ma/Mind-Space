import User from "../model/userModel.js";
import * as factory from "./handlerFactory.js";
import APIFeatures from "../utils/apiFeatures.js";

export const getAllUsers = factory.getAll(User);

export const getUsersByRole = async (req, res, next) => {
  try {
    const { role, q, ...restQuery } = req.query;
    const baseQuery = role ? User.find({ role }) : User.find();

    const features = new APIFeatures(baseQuery, restQuery)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    if (q) {
      const regex = new RegExp(q, "i");
      features.query = features.query.find({
        $or: [{ name: regex }, { sims_id: regex }],
      });
    }

    const students = await features.query;

    res.status(200).json({
      status: "success",
      results: students.length,
      data: students,
    });
  } catch (err) {
    next(err);
  }
};
