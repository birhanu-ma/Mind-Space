const toSet = arr => new Set(arr || []);

export function jaccardSimilarity(a = [], b = []) {
  const setA = toSet(a);
  const setB = toSet(b);

  const intersection = [...setA].filter(x => setB.has(x)).length;
  const union = new Set([...setA, ...setB]).size;

  return union === 0 ? 0 : intersection / union;
}

export function comfortSimilarity(counselorLevels = {}, menteeLevels = {}) {
  // If mentee comfortLevel is string, convert to numeric
  const comfortMap = { low: 1, medium: 3, high: 5 };
  if (typeof menteeLevels === "string") {
    menteeLevels = { default: comfortMap[menteeLevels.toLowerCase()] || 3 };
  }

  let total = 0;
  let count = 0;

  for (const key in menteeLevels) {
    if (counselorLevels[key] !== undefined) {
      const diff = Math.abs(counselorLevels[key] - menteeLevels[key]);
      total += 1 - diff / 5; // normalize scale 1-5
      count++;
    }
  }

  return count === 0 ? 0 : total / count;
}

export function timezoneSimilarity(counselorTZ, menteeTZ) {
  const parse = tz => {
    if (!tz || typeof tz !== "string") return 0; // default GMT+0
    return parseInt(tz.replace("GMT", ""), 10) || 0;
  };
  const diff = Math.abs(parse(counselorTZ) - parse(menteeTZ));
  return Math.max(0, 1 - diff / 12);
}
