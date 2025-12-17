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

// Standard CRUD using factory
export const createApplication = factory.createOne(Application);
export const getApplication = factory.getOne(Application);
export const getAllApplications = factory.getAll(Application);
export const updateApplication = factory.updateOne(Application);
export const deleteApplication = factory.deleteOne(Application);



export const reviewApplications = async (req, res, next) => {
  try {
    const { status } = req.body; // pending | approved | rejected

    // validate status
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid status",
      });
    }

    // find application
    const application = await Application.findById(req.params.id).populate("user");
    if (!application) {
      return res.status(404).json({
        status: "fail",
        message: "Application not found",
      });
    }

    const user = application.user;

    // update application status
    application.status = status;
    await application.save();

    /* ===================== APPROVED ===================== */
    if (status === "approved") {
      // check if profession already exists for this application
      const existingProfession = await Profession.findOne({
        profession: application._id,
      });

      if (!existingProfession) {
        await Profession.create({
          profession: application._id, // 👈 matches schema
          approvedBy: req.user.id,      // admin
          active: true,
        });
      }

      // update user role
      if (user.role !== "counselor") {
        user.role = "counselor";
        await user.save();
      }
    }

    /* ===================== REJECTED ===================== */
    if (status === "rejected") {
      // delete profession linked to this application
      await Profession.findOneAndDelete({
        profession: application._id,
      });

      // revert role if needed
      if (user.role === "counselor") {
        user.role = "user";
        await user.save();
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
