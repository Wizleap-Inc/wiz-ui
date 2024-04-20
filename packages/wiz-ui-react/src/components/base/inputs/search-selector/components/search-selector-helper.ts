import { SearchSelectorOption } from "./types";

function levenshteinDistance(s1: string, s2: string): number {
  const dist: number[][] = Array.from({ length: s1.length + 1 }, () =>
    Array(s2.length + 1).fill(0)
  );
  for (let i = 0; i < s1.length + 1; i++) dist[i][0] = i;
  for (let i = 0; i < s2.length + 1; i++) dist[0][i] = i;
  for (let i = 1; i < s1.length + 1; i++) {
    for (let j = 1; j < s2.length + 1; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dist[i][j] = Math.min(
        dist[i - 1][j] + 1,
        dist[i][j - 1] + 1,
        dist[i - 1][j - 1] + cost
      );
    }
  }
  return dist[s1.length][s2.length] / Math.max(s1.length, s2.length);
}

export function filterOptions(
  options: SearchSelectorOption[],
  searchText: string,
  threshold: number
) {
  if (searchText.length === 0) {
    return options;
  }
  const levenshteinDistanceMap = options.reduce<Record<string, number>>(
    (map, option) => {
      map[option.label] = levenshteinDistance(option.label, searchText);
      return map;
    },
    {}
  );
  const minLevenshteinDistance = Math.min(
    ...Object.values(levenshteinDistanceMap)
  );
  return (
    options
      // 類似度が閾値以下 or 全て閾値を上回る場合は部分一致
      .filter(
        (option) =>
          levenshteinDistanceMap[option.label] <= threshold ||
          (minLevenshteinDistance > threshold &&
            option.label.includes(searchText))
      )
      // 類似度でソート
      .sort(
        (a, b) =>
          levenshteinDistanceMap[a.label] - levenshteinDistanceMap[b.label]
      )
  );
}
