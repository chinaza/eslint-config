import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  { ignores: ['dist', 'build', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
        ...globals.jest,
      },
    },
    rules: {
      'prefer-arrow-callback': 'warn',
      'no-var': 'warn',
      'no-const-assign': 'error',
      'block-scoped-var': 'error',
      'default-case': 'error',
      'handle-callback-err': 'warn',
      'no-path-concat': 'error',
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-unused-expressions': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-redeclare': 'error',
      'vars-on-top': 'error',
      'spaced-comment': 'warn',
      strict: 'error',
      'prefer-template': 'warn',
      'prefer-const': 'error',
      'no-useless-concat': 'warn',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['error'],
    },
  },
  eslintConfigPrettier,
  eslintPluginPrettierRecommended
);
