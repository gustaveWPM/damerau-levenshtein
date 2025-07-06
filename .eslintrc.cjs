/* v8 ignore start */
// @ts-check

const [_OFF, _WARN, _ERROR] = [0, 1, 2];
const [OFF, , ERROR] = [_OFF, _WARN, _ERROR];

/** @type {import("eslint").Linter.Config} */
module.exports = {
  rules: {
    "@typescript-eslint/no-unused-vars": [
      ERROR,
      { ignoreRestSiblings: false, args: "all", vars: "all" },
    ],
    "@typescript-eslint/consistent-type-imports": [
      ERROR,
      { fixStyle: "separate-type-imports" },
    ],
    "import/no-extraneous-dependencies": [ERROR, { devDependencies: false }],
    "import/consistent-type-specifier-style": [ERROR, "prefer-top-level"],
    "unused-imports/no-unused-imports": ERROR,
    "import/no-duplicates": ERROR,

    "no-unreachable": ERROR,
    "require-await": ERROR,
    "no-unused-vars": OFF, // * ... Tricky: using @typescript-eslint/no-unused-vars
    "import/first": ERROR,
    "no-eval": ERROR,
  },
  overrides: [
    {
      files: [
        "vitest.config.ts",
        "*.test.ts",
        "*.test.tsx",
        "*.test-d.ts",
        "*Adapter.js",
      ],
      rules: {
        "import/no-extraneous-dependencies": [OFF, { devDependencies: true }],
      },
    },
  ],

  extends: [
    "plugin:perfectionist/recommended-alphabetical",
    "plugin:perfectionist/recommended-natural",
    "plugin:perfectionist/recommended-line-length",
  ],

  plugins: [
    "@typescript-eslint",
    "import",
    "unused-imports",
    "only-error",
    "perfectionist",
  ],

  parser: "@typescript-eslint/parser",
};

/* v8 ignore stop */
