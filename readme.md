# Zhap ESLint & Prettier Config

This package provides Zhap's ESLint and Prettier extensible shared config using the modern flat configuration format.

There are 3 configs available:

- **@chinaza/eslint-config/express.eslint.config** - For Node.js/Express applications (supports TypeScript & JavaScript)
- **@chinaza/eslint-config/ionic.eslint.config** - For Ionic React applications (supports TypeScript, JSX, and mobile development)
- **@chinaza/eslint-config/prettier.config** - Prettier configuration

## Installation

```bash
npm install -D @chinaza/eslint-config eslint prettier typescript-eslint
```

> **Note**: We intentionally do not include `eslint-plugin-prettier` as a dependency. This package uses `eslint-config-prettier` to disable conflicting ESLint rules while keeping Prettier and ESLint as separate tools. See the [Philosophy section](#philosophy-prettier--eslint-separation) for more details.

## Express/Node.js Configuration

The Express config provides comprehensive linting for Node.js and Express.js applications with support for both TypeScript and JavaScript.

### Features

- ✅ TypeScript and JavaScript support
- ✅ Node.js globals and best practices
- ✅ Express.js specific rules
- ✅ Security-focused linting
- ✅ Test file configurations
- ✅ Prettier integration

### Usage with Flat Config (ESLint 9.x)

Create an `eslint.config.js` file in your project root:

```javascript eslint.config.js
import expressConfig from "@chinaza/eslint-config/express.eslint.config";

export default expressConfig;
```

### Customizing the Configuration

You can extend or override the configuration:

```javascript eslint.config.js
import expressConfig from "@chinaza/eslint-config/express.eslint.config";
import tseslint from "typescript-eslint";

export default tseslint.config(...expressConfig, {
  // Your custom rules
  rules: {
    "no-console": "warn",
    // Add more custom rules
  },
});
```

### TypeScript Support

The configuration automatically detects TypeScript files and applies appropriate rules. Make sure you have a `tsconfig.json` in your project root:

```json tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Usage in Prettier

### package.json

```json package.json
{
  "prettier": "@chinaza/eslint-config/prettier.config"
}
```

### Or create a prettier.config.js file

```javascript prettier.config.js
export { default } from "@chinaza/eslint-config/prettier.config";
```

## Legacy Configuration (ESLint 8.x)

For projects still using ESLint 8.x, you can use the legacy format:

### .eslintrc.json

```json .eslintrc.json
{
  "extends": "@chinaza/eslint-config/express"
}
```

## Philosophy: Prettier + ESLint Separation

This configuration **does not** include `eslint-plugin-prettier`. Instead, we recommend running Prettier separately from ESLint for the following reasons:

### Why We Don't Use eslint-plugin-prettier

- **Performance**: Running Prettier through ESLint is significantly slower than running them separately
- **Clear Separation of Concerns**:
  - **Prettier** handles code formatting (spacing, line breaks, quotes)
  - **ESLint** focuses on code quality and best practices (logic errors, unused variables, etc.)
- **Reduced Conflicts**: Avoids potential rule conflicts between ESLint and Prettier
- **Better Developer Experience**: Clearer error messages and faster feedback
- **Tool Independence**: Each tool can be updated and configured independently

### Recommended Workflow

```bash
# Format code with Prettier
npm run prettier --write .

# Lint code with ESLint
npm run eslint .

# Or run both in sequence
npm run prettier --write . && npm run eslint .
```

### Package.json Scripts

```json package.json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "check": "npm run format:check && npm run lint"
  }
}
```

## What's Included

### Express Config Rules

- **Security**: No eval, implied eval protection
- **Node.js**: Proper callback error handling, no path concatenation
- **TypeScript**: Full type checking, unused variable detection
- **Code Quality**: Prefer const, template literals, arrow functions
- **Best Practices**: Block scoped variables, default cases

### File Support

- `**/*.{js,mjs,cjs}` - JavaScript files
- `**/*.{ts,tsx}` - TypeScript files
- `**/*.test.{js,ts}`, `**/*.spec.{js,ts}` - Test files with relaxed rules

### Ignored Patterns

- `dist/**`, `build/**` - Build outputs
- `coverage/**` - Test coverage reports
- `node_modules/**` - Dependencies
- `*.min.js` - Minified files
- `logs/**` - Log files

## Contributing

To contribute to this configuration:

1. Fork the repository
2. Make your changes
3. Test with a sample project
4. Submit a pull request

## Ionic/React Configuration

The Ionic config provides comprehensive linting for Ionic React applications with mobile development optimizations.

### Features

- ✅ React 17+ support (no need for React import)
- ✅ TypeScript and JavaScript support
- ✅ Ionic component compatibility
- ✅ Capacitor integration
- ✅ Mobile performance optimizations
- ✅ PWA and Service Worker support
- ✅ Testing framework integration (Jest, Cypress)
- ✅ Prettier integration

### Usage with Flat Config (ESLint 9.x)

Create an `eslint.config.js` file in your Ionic project root:

```javascript eslint.config.js
import ionicConfig from "@chinaza/eslint-config/ionic.eslint.config";

export default ionicConfig;
```

### Customizing for Ionic Projects

```javascript eslint.config.js
import ionicConfig from "@chinaza/eslint-config/ionic.eslint.config";
import tseslint from "typescript-eslint";

export default tseslint.config(...ionicConfig, {
  files: ["src/**/*.{ts,tsx}"],
  rules: {
    // Ionic components use kebab-case
    "react/jsx-pascal-case": [
      "error",
      {
        allowAllCaps: true,
        ignore: ["ion-*"],
      },
    ],

    // Mobile development considerations
    "@typescript-eslint/no-floating-promises": "warn",
    "no-console": "warn", // Useful for device debugging
  },
});
```

### Capacitor Integration

```javascript eslint.config.js
import ionicConfig from "@chinaza/eslint-config/ionic.eslint.config";
import tseslint from "typescript-eslint";

export default tseslint.config(...ionicConfig, {
  files: ["src/**/*.{ts,tsx}"],
  languageOptions: {
    globals: {
      Capacitor: "readonly",
      CapacitorGlobal: "readonly",
    },
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off", // Native APIs
    "@typescript-eslint/no-unsafe-call": "off",
  },
});
```

### Project Structure Support

The Ionic config includes optimized rules for:

- **Pages** (`src/pages/**`) - Relaxed nesting rules
- **Components** (`src/components/**`) - Stricter reusability rules
- **Hooks** (`src/hooks/**`) - React hooks best practices
- **Services** (`src/services/**`) - Business logic patterns
- **Tests** (`**/*.test.tsx`, `cypress/**`) - Testing-friendly rules

### Mobile Development Optimizations

- **Performance**: Rules to prevent common mobile performance issues
- **Bundle Size**: Warnings for patterns that increase bundle size
- **Async Operations**: Proper handling of Promises and async/await
- **Memory Management**: Rules to prevent memory leaks in long-running apps

### PWA Support

```javascript eslint.config.js
import ionicConfig from "@chinaza/eslint-config/ionic.eslint.config";
import tseslint from "typescript-eslint";

export default tseslint.config(...ionicConfig, {
  // Service Worker files
  files: ["public/sw.js", "src/serviceWorker.ts"],
  languageOptions: {
    globals: {
      self: "readonly",
      clients: "readonly",
    },
  },
});
```

## What's Included

> **Note**: Like the Express config, this Ionic configuration follows the same philosophy of separating Prettier and ESLint concerns. See the [Philosophy section](#philosophy-prettier--eslint-separation) above for details on why we don't use `eslint-plugin-prettier`.

### Ionic Config Rules

- **React**: Modern React patterns, hooks, JSX optimization
- **TypeScript**: Full type checking with mobile-friendly relaxations
- **Ionic**: Component compatibility, performance optimizations
- **Mobile**: Battery life, memory usage, performance considerations
- **Testing**: Jest, React Testing Library, Cypress integration
- **Build**: Vite, Capacitor, PWA optimizations

### File Support

- `**/*.{js,jsx,mjs,cjs}` - JavaScript and JSX files
- `**/*.{ts,tsx}` - TypeScript and TSX files
- `**/*.test.{js,ts,jsx,tsx}` - Test files
- `cypress/**/*.{js,ts}` - E2E tests
- `**/*.stories.{ts,tsx}` - Storybook files

### Ignored Patterns

- `dist/**`, `build/**` - Build outputs
- `android/**`, `ios/**` - Native platform code
- `public/**` - Static assets
- `coverage/**` - Test coverage
- `electron/**` - Desktop builds

## License

MIT
