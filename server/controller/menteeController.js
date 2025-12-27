import Mentee from "../model/menteeModel.js";
import * as factory from "./handlerFactory.js";
import Petition from "../model/petitionModel.js"

export const menteeCreatePetition = factory.createOne(Petition);

// Standard CRUD using factory
export const createMenteeApplication = factory.createOne(Mentee);
export const getAllApplications = factory.getAll(Mentee);
export const getMentee = factory.getOne(Mentee);
export const updateMenteeApplication = factory.updateOne(Mentee);
export const deleteMenteeApplication = factory.deleteOne(Mentee);

// Review mentee application (custom logic)
export const reviewMenteeApplication = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid status value",
      });
    }

    const menteeApp = await Mentee.findById(req.params.id).populate("user");

    if (!menteeApp) {
      return res.status(404).json({
        status: "fail",
        message: "Mentee application not found",
      });
    }

    // Update application status
    menteeApp.status = status;
    await menteeApp.save();

    // ✅ ROLE MANAGEMENT (EXPLICIT & SAFE)
    if (status === "approved") {
      menteeApp.user.role = "mentee";
      await menteeApp.user.save();
    }

    if (status === "rejected") {
      menteeApp.user.role = "user";
      await menteeApp.user.save();
    }

    res.status(200).json({
      status: "success",
      data: menteeApp,
    });
  } catch (err) {
    next(err);
  }
};
