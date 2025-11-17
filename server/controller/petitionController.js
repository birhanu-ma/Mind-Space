import Petition from "../model/petitionModel.js"
import * as factory from "./handlerFactory.js";

export const createPetition = factory.createOne(Petition);
export const getAllPetitions = factory.getAll(Petition);
export const getPetition = factory.getOne(Petition, {
  path: "user reviewedBy",
  select: "name role",
});
export const updatePetition = factory.updateOne(Petition);
export const deletePetition = factory.deleteOne(Petition);
