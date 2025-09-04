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
      "@typescript-eslint/no-implied-eval": "error",
      "@typescript-eslint/only-throw-error": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/prefer-optional-chain": "warn",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-enum-comparison": "off",
      "@typescript-eslint/require-await": "off",

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
