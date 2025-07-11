export function damerauLevenshtein(s1: string, s2: string): number {
  if (s1 === s2) return 0;

  const [s1len, s2len] = [s1.length, s2.length];
  const matrix: number[][] = Array.from({ length: s1len + 1 }, () => new Array(s2len + 1).fill(0));

  for (let y = 1; y <= s1len; y++) matrix[y][0] = y;
  for (let x = 1; x <= s2len; x++) matrix[0][x] = x;

  for (let y = 1; y <= s1len; y++) {
    for (let x = 1; x <= s2len; x++) {
      if (s1[y - 1] === s2[x - 1]) {
        matrix[y][x] = matrix[y - 1][x - 1];
      } else {
        matrix[y][x] = 1 + Math.min(matrix[y - 1][x], matrix[y][x - 1], matrix[y - 1][x - 1]);
        if (y > 1 && x > 1 && s1[y - 1] === s2[x - 2] && s1[y - 2] === s2[x - 1]) {
          matrix[y][x] = Math.min(matrix[y][x], matrix[y - 2][x - 2] + 1);
        }
      }
    }
  }

  return matrix[s1len][s2len];
}

/**
 * @remarks
 * This early exit optimization improves performance when comparing many strings,
 * especially in approximate matching or fuzzy search scenarios where only distances
 * up to a certain limit are relevant.
 *
 * @note
 * The sentinel value can be customized by passing the `sentinelValue` parameter.
 * However, for consistency and maintainability, consider creating your own wrapper
 * rather than tweaking the parameter everywhere.
 */
export function lazyDamerauLevenshtein(s1: string, s2: string, limit: number, sentinelValue = limit + 1): number {
  if (Math.abs(s1.length - s2.length) > limit) return sentinelValue;
  return damerauLevenshtein(s1, s2);
}
