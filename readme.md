# Zhap ESLint & Prettier Config

This package provides Zhap's ESLint and Pretter extensible shared config

There are 2 configs:

- @chinaza/eslint-config/express - This enables linting for NodeJS/ Express based applications
- @chinaza/eslint-config/react - This enables linting rules for React and JSX based code

## Installation

`npm install -D @chinaza/eslint-config`

## Usage In ESLint

### package.json

```JSON
{
    "eslintConfig": {
        "extends": [
            "@chinaza/eslint-config/express|react"
        ]
    }
}
```

### .eslintrc.json or .eslintrc.js

```JSON
{
    "extends": "@chinaza/eslint-config/express|react"
}
```

## Usage in Prettier

### package.json

```JSON
{
    "prettier": "@chinaza/eslint-config/prettier"
}
```
