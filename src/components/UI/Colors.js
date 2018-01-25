export const evaluationColors = {
  red: "#FF4136",
  yellow: "#FFDC00",
  green: "#2ECC40",
  missing: "#AAAAAA"
}

export default function(evaluation) {
  if (!evaluation) return evaluationColors.missing
  return evaluationColors[evaluation]
}
