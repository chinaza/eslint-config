import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';

export default tseslint.config(
  { ignores: ['dist', 'build', 'cypress.config.ts'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react: react,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'prefer-arrow-callback': 'warn',
      'no-var': 'warn',
      'no-const-assign': 'error',
      'block-scoped-var': 'error',
      'default-case': 'error',
      'no-undef': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-unreachable': 'error',
      'no-unused-expressions': 'warn',
      'no-redeclare': 'error',
      'vars-on-top': 'error',
      'spaced-comment': 'warn',
      strict: 'error',
      'prefer-template': 'warn',
      'prefer-const': 'error',
      'no-useless-concat': 'warn',
      '@typescript-eslint/no-use-before-define': 'error',
      'react/prop-types': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/prefer-regexp-exec': 'off',
      'react/display-name': 'off',
      '@typescript-eslint/no-empty-function': 'warn',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['error'],
      'react/self-closing-comp': [
        'error',
        {
          component: true,
        },
      ],
    },
  },
  eslintConfigPrettier,
  eslintPluginPrettierRecommended
);
