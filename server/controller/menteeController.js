import Mentee from "../model/menteeModel.js";
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
export const createMenteeApplication = factory.createOne(Mentee);
export const getMenteeDetail = factory.getOne(Mentee);
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

    menteeApp.status = status;
    await menteeApp.save();

    // Update user role to mentee if approved
    if (status === "approved" && menteeApp.user.role !== "mentee") {
      menteeApp.user.role = "mentee";
      await menteeApp.user.save();
    }

    // Revert role if rejected
    if (status === "rejected" && menteeApp.user.role === "mentee") {
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
