import Application from "../model/ApplicationModel.js";
import * as factory from "./handlerFactory.js";
import APIFeatures from "../utils/apiFeatures.js";
export const createApplication = factory.createOne(Application);
export const getApplication = factory.getOne(Application, {
  path: "likes dislikes comments reviewedBy relatedApplications",
  select: "name role",
});
export const getAllApplications = factory.getAll(Application);
export const updateApplication = factory.updateOne(Application);
export const deleteApplication = factory.deleteOne(Application);

export const getApplicationsByType = async (req, res, next) => {
  try {
    console.log("Application query", req.query);
    const { applicationType, q, ...restQuery } = req.query;
    const baseQuery = applicationType ? Application.find({ applicationType }) : Application.find();

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

    const Applications = await features.query;

    res.status(200).json({
      status: "success",
      results: Applications.length,
      data: Applications,
    });
  } catch (err) {
    next(err);
  }
};
