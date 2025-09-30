import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

/**
 * Reusable ESLint configuration for Ionic React projects
 * Supports TypeScript, JSX, and modern React patterns
 * Includes Ionic-specific optimizations and mobile development best practices
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
      "*.min.css",
      "cypress.config.ts",
      "capacitor.config.ts",
      "public/**",
      ".next/**",
      "android/**",
      "ios/**",
      "electron/**",
    ],
  },

  // Base configuration for JavaScript files
  {
    extends: [js.configs.recommended],
    files: ["**/*.{js,jsx,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2022,
        ...globals.jest,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // React specific rules
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/prop-types": "off", // Not needed with TypeScript
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/jsx-uses-react": "off", // Not needed in React 17+
      "react/jsx-uses-vars": "error",
      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: true,
        },
      ],
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],

      // Development vs Production
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",

      // Code quality
      "prefer-arrow-callback": "warn",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "warn",

      // Error prevention
      "no-const-assign": "error",
      "no-undef": "error",
      "no-unreachable": "error",
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
      "no-redeclare": "error",

      // Best practices
      "block-scoped-var": "error",
      "default-case": "error",
      "vars-on-top": "warn",
      "spaced-comment": "warn",
      strict: ["error", "never"], // Not needed in modules
    },
  },

  // TypeScript + React configuration
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2022,
        ...globals.jest,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // Disable base rules covered by TypeScript
      "no-unused-vars": "off",
      "no-undef": "off", // TypeScript handles this
      "no-redeclare": "off",
      "no-use-before-define": "off",
      "no-shadow": "off",
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
      "@typescript-eslint/no-explicit-any": "off", // Disabled for flexibility
      "@typescript-eslint/no-empty-function": "warn",

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

      // React specific rules
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
      "react/display-name": "off", // Often not needed in Ionic
      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: true,
        },
      ],
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
      "react/jsx-no-useless-fragment": "error",
      "react/jsx-pascal-case": "error",

      // React Refresh for development
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Development vs Production
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",

      // Code quality
      "prefer-arrow-callback": "warn",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "warn",

      // Error prevention
      "no-const-assign": "error",
      "no-unreachable": "error",
      "no-unused-expressions": "warn",
      "no-useless-concat": "warn",

      // Best practices
      "block-scoped-var": "error",
      "default-case": "error",
      "vars-on-top": "warn",
      "spaced-comment": "warn",
    },
  },

  // Test files configuration
  {
    files: [
      "**/*.test.{js,ts,jsx,tsx}",
      "**/*.spec.{js,ts,jsx,tsx}",
      "**/tests/**",
      "**/__tests__/**",
      "**/cypress/**",
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.mocha,
        cy: "readonly", // Cypress
        Cypress: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-empty-function": "off",
      "no-unused-expressions": "off",
      "react/display-name": "off",
      "no-console": "off",
    },
  },

  // Capacitor configuration files
  {
    files: ["capacitor.config.ts", "ionic.config.json"],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "no-console": "off",
    },
  },

  // Prettier integration
  eslintConfigPrettier
);
