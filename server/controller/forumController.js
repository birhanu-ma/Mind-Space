import Forum from "../model/forumModel.js";
import * as factory from "./handlerFactory.js";
import APIFeatures from "../utils/apiFeatures.js";
export const createForum = factory.createOne(Forum);
export const getForum = factory.getOne(Forum, {
  path: "likes dislikes comments reviewedBy relatedForums",
  select: "name role",
});
export const getAllForums = factory.getAll(Forum);
export const updateForum = factory.updateOne(Forum);
export const deleteForum = factory.deleteOne(Forum);

export const getForumsByType = async (req, res, next) => {
  try {
    console.log("Forum query", req.query);
    const { forumType, q, ...restQuery } = req.query;
    const baseQuery = forumType ? Forum.find({ forumType }) : Forum.find();

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

    const Forums = await features.query;

    res.status(200).json({
      status: "success",
      results: Forums.length,
      data: Forums,
    });
  } catch (err) {
    next(err);
  }
};
