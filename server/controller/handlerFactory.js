import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import APIFeatures from "../utils/apiFeatures.js";

export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

export const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // Ensure req.user exists (user must be logged in)
    if (!req.user || !req.user._id) {
      return next(new AppError("You must be logged in to create an application", 401));
    }

    // Optional: prevent duplicate application for same user
    const existing = await Model.findOne({ user: req.user._id });
    if (existing) {
      return next(new AppError("You already have an application", 400));
    }

    // Ignore any user field from frontend for security
    const doc = await Model.create({
      ...req.body,
      user: req.user._id, // always use logged-in user
    });

    console.log("this is counselor data", doc);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });


export const getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

export const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log("passed model", Model);
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.id) filter = { article: req.params.id };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;
    console.log("articles list", doc);

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
