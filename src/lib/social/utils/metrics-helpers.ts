export const calculateEngagementScore = (
  interactions: number,
  reach: number,
  timeWindow: number
): number => {
  const rate = (interactions / reach) * 100;
  const timeDecay = Math.exp(-timeWindow / (24 * 60 * 60 * 1000));
  return rate * timeDecay;
};

export const calculateViralityScore = (
  shares: number,
  engagement: number,
  timeWindow: number
): number => {
  const baseScore = (shares * engagement) / 10000;
  const timeDecay = Math.exp(-timeWindow / (12 * 60 * 60 * 1000));
  return baseScore * timeDecay;
};

export const formatMetricValue = (
  value: number,
  type: "percentage" | "number" | "score"
): string => {
  switch (type) {
    case "percentage":
      return `${value.toFixed(1)}%`;
    case "number":
      return value.toLocaleString();
    case "score":
      return value.toFixed(2);
    default:
      return value.toString();
  }
};
