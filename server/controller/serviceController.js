import Service from "../model/serviceModel.js";
import * as factory from "./handlerFactory.js";
import APIFeatures from "../utils/apiFeatures.js";
export const createService = factory.createOne(Service);
export const getService = factory.getOne(Service, {
  path: "likes dislikes comments reviewedBy related Services",
  select: "name role",
});
export const getAllServices = factory.getAll(Service);
export const updateService = factory.updateOne(Service);
export const deleteService = factory.deleteOne(Service);
export const getServiceDetails = factory.getOne(Service);
export const reviewServices = factory.updateOne(Service);

export const getServicesByType = async (req, res, next) => {
  try {
    console.log("Service query", req.query);
    const { ServiceType, q, ...restQuery } = req.query;
    const baseQuery = ServiceType ? Service.find({ ServiceType }) : Service.find();

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

    const Services = await features.query;

    res.status(200).json({
      status: "success",
      results: Services.length,
      data: Services,
    });
  } catch (err) {
    next(err);
  }
};
