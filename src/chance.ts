/**
 * 1 = 100%
 * 0.5 = 50%
 */
export const change = (probability: number) => {
  return Math.random() < probability;
};
