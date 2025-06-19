// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  ignorePath: '.prettierignore',

  jsxBracketSameLine: false,

  printWidth: 80,

  proseWrap: 'preserve',

  requireConfig: false,

  semi: true,

  singleQuote: true,

  stylelintIntegration: false,

  tabWidth: 2,

  trailingComma: 'none',

  useTabs: false
};

export default config;
