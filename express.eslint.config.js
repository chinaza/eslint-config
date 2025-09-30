import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

/**
 * Reusable ESLint configuration for Express.js projects
 * Supports both TypeScript and JavaScript files
 * Includes Node.js globals and Express.js best practices
 */
export default defineConfig(
  // Global ignores
  {
    ignores: [
      "dist/**",
      "build/**",
      "coverage/**",
      "node_modules/**",
      "*.min.js",
      ".env*",
      "logs/**",
    ],
  },

  // Base configuration for all JavaScript files
  {
    extends: [js.configs.recommended],
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2022,
        ...globals.jest,
      },
    },
    rules: {
      // Code quality
      "prefer-arrow-callback": "warn",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "warn",

      // Error prevention
      "no-const-assign": "error",
      "no-undef": "error",
      "no-unreachable": "error",
      "no-redeclare": "error",
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "no-unused-expressions": "warn",
      "no-useless-concat": "warn",

      // Node.js/Express specific
      "handle-callback-err": "warn",
      "no-path-concat": "error",

      // Best practices
      "block-scoped-var": "error",
      "default-case": "error",
      "vars-on-top": "warn",
      "spaced-comment": "warn",
      strict: ["error", "global"],

      // Security
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
    },
  },

  // TypeScript specific configuration
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2022,
        ...globals.jest,
      },
    },
    rules: {
      // Disable base rules that are covered by TypeScript versions
      "no-unused-vars": "off",
      "no-use-before-define": "off",
      "no-shadow": "off",
      "no-redeclare": "off",
      "no-implied-eval": "off",
      "no-throw-literal": "off",
      "dot-notation": "off", // Disabled in favor of TypeScript version

      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-use-before-define": "error",
      "@typescript-eslint/no-shadow": ["error"],
      "@typescript-eslint/no-redeclare": "error",
      "@typescript-eslint/no-explicit-any": "off",

      // Explicitly disable rules that require type information
      "@typescript-eslint/await-thenable": "off",
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/no-array-delete": "off",
      "@typescript-eslint/no-base-to-string": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-deprecated": "off",
      "@typescript-eslint/no-duplicate-type-constituents": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-for-in-array": "off",
      "@typescript-eslint/no-implied-eval": "off",
      "@typescript-eslint/no-meaningless-void-operator": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-misused-spread": "off",
      "@typescript-eslint/no-mixed-enums": "off",
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/no-unnecessary-qualifier": "off",
      "@typescript-eslint/no-unnecessary-template-expression": "off",
      "@typescript-eslint/no-unnecessary-type-arguments": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-unnecessary-type-conversion": "off",
      "@typescript-eslint/no-unnecessary-type-parameters": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-enum-comparison": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-unary-minus": "off",
      "@typescript-eslint/only-throw-error": "off",
      "@typescript-eslint/prefer-find": "off",
      "@typescript-eslint/prefer-includes": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/prefer-optional-chain": "off",
      "@typescript-eslint/prefer-readonly": "off",
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      "@typescript-eslint/prefer-reduce-type-parameter": "off",
      "@typescript-eslint/prefer-regexp-exec": "off",
      "@typescript-eslint/prefer-return-this-type": "off",
      "@typescript-eslint/prefer-string-starts-ends-with": "off",
      "@typescript-eslint/promise-function-async": "off",
      "@typescript-eslint/require-array-sort-compare": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/return-await": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/switch-exhaustiveness-check": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/use-unknown-in-catch-clause-variable": "off",

      // Code quality for TypeScript
      "prefer-arrow-callback": "warn",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "warn",

      // Error prevention
      "no-const-assign": "error",
      "no-unreachable": "error",
      "no-unused-expressions": "warn",
      "no-useless-concat": "warn",

      // Node.js/Express specific
      "handle-callback-err": "warn",
      "no-path-concat": "error",

      // Best practices
      "block-scoped-var": "error",
      "default-case": "error",
      "vars-on-top": "warn",
      "spaced-comment": "warn",

      // Security
      "no-eval": "error",
      "no-new-func": "error",
    },
  },

  // Test files configuration
  {
    files: [
      "**/*.test.{js,ts}",
      "**/*.spec.{js,ts}",
      "**/test/**",
      "**/tests/**",
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.mocha,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "no-unused-expressions": "off",
    },
  },

  // Prettier integration
  eslintConfigPrettier
);
