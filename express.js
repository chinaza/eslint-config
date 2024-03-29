module.exports = {
  extends: ['plugin:prettier/recommended'],
  plugins: ['@typescript-eslint'],
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
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
    '@typescript-eslint/camelcase': 'off',
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
    'no-use-before-define': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
};
