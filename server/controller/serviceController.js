import Service from "../model/serviceModel.js";
import * as factory from "./handlerFactory.js";
import APIFeatures from "../utils/apiFeatures.js";
import catchAsync from "../utils/catchAsync.js";
export const getService = factory.getOne(Service, {
  path: "likes dislikes comments reviewedBy related Services",
  select: "name role",
});
export const getAllServices = factory.getAll(Service);
export const updateService = factory.updateOne(Service);
export const deleteService = factory.deleteOne(Service);
export const getServiceDetails = factory.getOne(Service);
export const reviewServices = factory.updateOne(Service);

export const createService = catchAsync(async (req, res, next) => {
  const { header, paragraph, serviceType, image } = req.body;

  if (!header || !paragraph || !serviceType) {
    return next(
      new AppError("Header, paragraph, and serviceType are required", 400)
    );
  }

  const newService = {
    header,
    paragraph,
    serviceType,
    image, // ← Comes directly from req.body.image set by processAndSaveServiceImage
  };

  const service = await Service.create(newService);

  res.status(201).json({
    status: "success",
    data: service,
  });
});
export const getServicesByType = catchAsync(async (req, res, next) => {
  const { serviceType, q, ...restQuery } = req.query;

  let query = {};
  if (serviceType) query.serviceType = serviceType;

  if (q) {
    const regex = new RegExp(q, "i");
    query.$or = [{ header: regex }, { paragraph: regex }];
  }

  const features = new APIFeatures(Service.find(query), restQuery)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const services = await features.query;

  res.status(200).json({
    status: "success",
    results: services.length,
    data: services,
  });
});
