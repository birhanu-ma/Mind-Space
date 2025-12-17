import { jaccardSimilarity, comfortSimilarity, timezoneSimilarity } from "./similarity.js";
import Counseling from "../model/counselingModel.js";

export default async function matchMenteesToCounselor(counselor, mentees) {
  // Get all assigned mentee IDs from Counseling collection
  const assignedMentees = await Counseling.find({ active: true }).select("mentee -_id");
  const assignedIds = assignedMentees.map(a => String(a.mentee));

  return (mentees || [])
    .filter(mentee => {
      // skip already assigned mentees
      if (assignedIds.includes(String(mentee._id))) return false;

      // skip if crisis but counselor can't handle
      if (mentee.isCrisis && counselor.canHandleCrisis === "no") return false;

      // skip if mentee has issues counselor avoids
      const menteeIssues = Array.isArray(mentee.issues) ? mentee.issues : [];
      const avoidTopics = Array.isArray(counselor.avoidTopics) ? counselor.avoidTopics : [];
      if (menteeIssues.some(i => avoidTopics.includes(i))) return false;

      return true;
    })
    .map(mentee => {
      const menteeComm = mentee.preferredCommunication
        ? Array.isArray(mentee.preferredCommunication)
          ? mentee.preferredCommunication
          : [mentee.preferredCommunication]
        : [];

      const menteeGoals = [mentee.primaryGoal, mentee.secondaryGoal].filter(Boolean);

      const menteeComfortLevels =
        mentee.severityLevels || (mentee.comfortLevel ? mentee.comfortLevel : {});

      const finalScore =
        0.30 * jaccardSimilarity(counselor.supportAreas || [], mentee.issues || []) +
        0.20 * jaccardSimilarity(counselor.mentalHealthSpecialties || [], mentee.mentalHealthNeeds || []) +
        0.20 * comfortSimilarity(counselor.comfortLevels || {}, menteeComfortLevels) +
        0.10 * jaccardSimilarity(counselor.communicationStyles || [], menteeComm) +
        0.10 * jaccardSimilarity(counselor.preferredMenteeGoals || [], menteeGoals) +
        0.05 * (counselor.availability === mentee.availability ? 1 : 0) +
        0.05 * timezoneSimilarity(counselor.timezone, mentee.timezone);

      return {
        ...mentee.toObject(),
        finalScore: Number(finalScore.toFixed(4)),
      };
    })
    .sort((a, b) => b.finalScore - a.finalScore);
}
