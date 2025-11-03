import Counseling from "../model/counselingModel.js";
import * as factory from "./handlerFactory.js";

export const createCounseling = factory.createOne(Counseling);
export const getCounseling = factory.getOne(Counseling, {
  path: "counselor mentee reviewedBy",
  select: "name role",
});
export const updateCounseling = factory.updateOne(Counseling);
export const deleteCounseling = factory.deleteOne(Counseling);
