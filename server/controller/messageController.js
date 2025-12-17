import ContactMessage from "../model/messageModel.js";
import * as factory from "./handlerFactory.js"

export const createMessage = factory.createOne(ContactMessage)
export const getAllMessage = factory.getAll(ContactMessage)
export const getMessage = factory.getOne(ContactMessage)
export const deleteMessage = factory.deleteOne(ContactMessage)