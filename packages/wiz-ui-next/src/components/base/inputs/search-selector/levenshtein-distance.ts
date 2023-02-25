export const levenshteinDistance = (s1: string, s2: string): number => {
  const dist: number[][] = Array.from({ length: s1.length + 1 }, () =>
    Array(s2.length + 1).fill(0)
  );
  console.log(s1, s2, dist);
  for (let i = 0; i < s1.length; i++) dist[i][0] = i;
  for (let i = 0; i < s2.length; i++) dist[0][i] = i;
  console.log(s1, s2, dist);
  for (let i = 1; i < s1.length; i++) {
    for (let j = 1; j < s2.length; j++) {
      const cost = s1[i] === s2[j] ? 0 : 1;
      dist[i][j] = Math.min(
        dist[i - 1][j] + 1,
        dist[i][j - 1] + 1,
        dist[i - 1][j - 1] + cost
      );
    }
  }
  return dist[s1.length - 1][s2.length - 1] / Math.max(s1.length, s2.length);
};
