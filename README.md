# Damerau-Levenshtein

Raw Damerau-Levenshtein distance in TypeScript.

## API

```ts
damerauLevenshtein(a: string, b: string): number
```

Returns the Damerau-Levenshtein distance (insert, delete, substitute, transpose).

```ts
lazyDamerauLevenshtein(a: string, b: string, limit: number, sentinelValue = limit + 1): number
```

Skips full computation if min possible distance > limit.  
If so, returns limit + 1.
