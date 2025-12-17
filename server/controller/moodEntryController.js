import MoodEntry from "../model/moodEntryModel.js"
import * as factory from "./handlerFactory.js"

export const createMoodEntry = factory.createOne(MoodEntry)
export const getAllMoodEntry = factory.getAll(MoodEntry)
export const getMoodEntry = factory.getOne(MoodEntry)
export const deleteMoodEntry = factory.deleteOne(MoodEntry)