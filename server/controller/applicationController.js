import Application from "../model/applicationModel.js";
import * as factory from "./handlerFactory.js";

export const createApplication = factory.createOne(Application);
export const getApplication = factory.getOne(Application, {
  path: "counselor mentee reviewedBy",
  select: "name  role",
});
export const updateApplication = factory.updateOne(Application);
export const deleteApplication = factory.deleteOne(Application);
