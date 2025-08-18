import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import react from "eslint-plugin-react";

/**
 * Reusable ESLint configuration for Ionic React projects
 * Supports TypeScript, JSX, and modern React patterns
 * Includes Ionic-specific optimizations and mobile development best practices
 */
export default tseslint.config(
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
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2022,
        ...globals.jest,
      },
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: process.cwd(),
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
      // Disable base rules covered by TypeScript
      "no-unused-vars": "off",
      "no-undef": "off", // TypeScript handles this
      "no-redeclare": "off",
      "no-use-before-define": "off",
      "no-shadow": "off",
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
      "@typescript-eslint/prefer-nullish-coalescing": "warn",
      "@typescript-eslint/prefer-optional-chain": "warn",
      "@typescript-eslint/no-floating-promises": "warn", // Relaxed for mobile dev
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-explicit-any": "off", // Disabled for flexibility
      "@typescript-eslint/no-empty-function": "warn",

      // Relaxed TypeScript rules for mobile development
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/prefer-regexp-exec": "off",

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
