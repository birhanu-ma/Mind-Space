import { jaccardSimilarity, comfortSimilarity, timezoneSimilarity } from "./similarity.js";
export default function matchMenteesToCounselor(counselor, mentees) {
  return (mentees || [])
    .filter(mentee => {
      if (mentee.isCrisis && counselor.canHandleCrisis === "no") return false;

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
        ...mentee.toObject(), // ✅ FULL mentee data
        finalScore: Number(finalScore.toFixed(4))
      };
    })
    .sort((a, b) => b.finalScore - a.finalScore);
}
