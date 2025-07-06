import { describe, expect, it } from 'vitest';

import { lazyDamerauLevenshtein, damerauLevenshtein } from '../damerauLevenshtein.js';

// https://github.com/aldebaran/libport/blob/master/tests/libport/damerau-levenshtein-distance.cc

describe('damerauLevenshtein', () => {
  const emptyString = '';

  it('should pass, empty strings', () => {
    const distance = damerauLevenshtein(emptyString, emptyString);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(distance).toBe(0);
  });

  it('should pass, distance 0', () => {
    const s = 'cat';
    const distance = damerauLevenshtein(s, s);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(distance).toBe(0);
  });

  it('should pass, 100% distance', () => {
    const s2 = 'test';
    const expectedDistance = s2.length;
    const distance = damerauLevenshtein(emptyString, s2);
    expect(distance).toBe(expectedDistance);
  });

  it('should pass, cat and dog', () => {
    const distance = damerauLevenshtein('cat', 'dog');
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(distance).toBe(3);
  });

  it('should pass, deletion', () => {
    const distance = damerauLevenshtein('azertyuiop', 'aeryuop');
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(distance).toBe(3);
  });

  it('should pass, insertion', () => {
    const distance = damerauLevenshtein('aeryuop', 'azertyuiop');
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(distance).toBe(3);
  });

  it('should pass, substitution', () => {
    const distance = damerauLevenshtein('azertyuiopqsdfghjklmwxcvbn,', 'qwertyuiopasdfghjkl;zxcvbnm');
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(distance).toBe(6);
  });

  it('should pass, transposition', () => {
    const distance = damerauLevenshtein('1234567890', '1324576809');
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(distance).toBe(3);
  });
});

describe('lazyDamerauLevenshtein', () => {
  it('returns 0 when both strings are empty', () => {
    expect(lazyDamerauLevenshtein('', '', 0)).toBe(0);
  });

  it('returns 0 when strings are identical', () => {
    expect(lazyDamerauLevenshtein('test', 'test', 2)).toBe(0);
  });

  it('returns exact distance when length difference is within limit', () => {
    const s1 = 'cat';
    const s2 = 'cut';
    const limit = 2;

    expect(lazyDamerauLevenshtein(s1, s2, limit)).toBe(1);
  });

  it('returns sentinelValue if length difference exceeds limit', () => {
    const s1 = 'short';
    const s2 = 'muchlongerstring';
    const limit = 5;

    expect(lazyDamerauLevenshtein(s1, s2, limit)).toBe(limit + 1);
  });

  it('allows customizing sentinelValue', () => {
    const s1 = 'abc';
    const s2 = 'abcdefgh';
    const limit = 2;
    const customSentinel = 999;

    expect(lazyDamerauLevenshtein(s1, s2, limit, customSentinel)).toBe(customSentinel);
  });

  it('returns exact distance if length difference equals limit', () => {
    const s1 = 'abc';
    const s2 = 'abcde';
    const limit = 2;

    expect(lazyDamerauLevenshtein(s1, s2, limit)).toBe(2);
  });
});
