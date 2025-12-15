import Application from "../model/counselorModel.js";
import Profession from "../model/professionalModel.js";
import * as factory from "./handlerFactory.js";
import Petition from "../model/petitionModel.js"


export const createPetition = factory.createOne(Petition);
export const getAllPetitions = factory.getAll(Petition);
export const getPetition = factory.getOne(Petition, {
  path: "user reviewedBy",
  select: "name role",
});
export const updatePetition = factory.updateOne(Petition);
export const deletePetition = factory.deleteOne(Petition);
export const getPetitionDetails = factory.getOne(Petition);
export const reviewPetitions = factory.updateOne(Petition);

// Standard CRUD using factory
export const createApplication = factory.createOne(Application);
export const getApplication = factory.getOne(Application);
export const getAllApplications = factory.getAll(Application);
export const updateApplication = factory.updateOne(Application);
export const deleteApplication = factory.deleteOne(Application);

// Review application (custom logic)
export const reviewApplications = async (req, res, next) => {
  try {
    const { status } = req.body; // pending | approved | rejected

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid status",
      });
    }

    const application = await Application.findById(req.params.id).populate("user");

    if (!application) {
      return res.status(404).json({
        status: "fail",
        message: "Application not found",
      });
    }

    application.status = status;
    await application.save();

    if (status === "approved") {
      // Create Profession if not exists
      const existingProfession = await Profession.findOne({ professional: application._id });
      if (!existingProfession) {
        await Profession.create({
          professional: application._id,
          approvedBy: req.user.id,
        });
      }

      // Update user role to counselor
      if (application.user.role !== "counselor") {
        application.user.role = "counselor";
        await application.user.save();
      }
    }

    if (status === "rejected") {
      // Remove Profession if exists
      await Profession.findOneAndDelete({ professional: application._id });

      // Revert user role to "user"
      if (application.user.role === "counselor") {
        application.user.role = "user";
        await application.user.save();
      }
    }

    res.status(200).json({
      status: "success",
      data: application,
    });
  } catch (err) {
    next(err);
  }
};
// Get applications by type / query
export const getApplicationsByType = async (req, res, next) => {
  try {
    const { applicationType, q, ...restQuery } = req.query;

    // Base query: filter by applicationType if provided
    let baseQuery = applicationType
      ? Application.find({ applicationType })
      : Application.find();

    // Apply additional filters, sort, pagination using APIFeatures
    const features = new APIFeatures(baseQuery, restQuery)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // Apply search query if provided
    if (q) {
      const regex = new RegExp(q, "i");
      features.query = features.query.find({
        $or: [{ name: regex }, { email: regex }],
      });
    }

    const applications = await features.query;

    res.status(200).json({
      status: "success",
      results: applications.length,
      data: applications,
    });
  } catch (err) {
    next(err);
  }
};
