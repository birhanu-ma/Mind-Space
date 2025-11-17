import Profession from "../model/professionalModel.js"
import * as factory from "./handlerFactory.js";
import APIFeatures from "../utils/apiFeatures.js";
export const createProfession = factory.createOne(Profession);
export const getProfession = factory.getOne(Profession, {
  path: "likes dislikes comments reviewedBy relatedProfessions",
  select: "name role",
});
export const getAllProfessions = factory.getAll(Profession);
export const updateProfession = factory.updateOne(Profession);
export const deleteProfession = factory.deleteOne(Profession);

export const getProfessionsByType = async (req, res, next) => {
  try {
    console.log("Profession query", req.query);
    const { professionType, q, ...restQuery } = req.query;
    const baseQuery = professionType ? Profession.find({ professionType }) : Profession.find();

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

    const Professions = await features.query;

    res.status(200).json({
      status: "success",
      results: Professions.length,
      data: Professions,
    });
  } catch (err) {
    next(err);
  }
};
