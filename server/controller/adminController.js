import Petition from "../model/petitionModel.js"
import * as factory from "./handlerFactory.js"

export const getAllPetition  = factory.getAll(Petition)
export const getPetition = factory.getOne(Petition)
export const reviewPetition = factory.updateOne(Petition)