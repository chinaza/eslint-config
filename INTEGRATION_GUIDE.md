# Express ESLint Integration Guide

This guide shows you how to integrate `@chinaza/eslint-config` into your Express.js projects.

## Step 1: Installation

Install the required dependencies:

```bash
npm install -D @chinaza/eslint-config eslint prettier typescript-eslint
```

## Step 2: Import and Configure ESLint

Create an ESLint configuration file using the flat configuration format:

```bash
touch eslint.config.js
```

Add the following code to `eslint.config.js`:

```javascript
// eslint.config.js
import expressConfig from '@chinaza/eslint-config/express.eslint.config';

export default expressConfig;
```

## Step 3: Create ESLint Instance Programmatically (Optional)

If you need to create an ESLint instance programmatically for custom tooling:

```javascript
// example-eslint-integration.js
import { ESLint } from 'eslint';
import expressConfig from '@chinaza/eslint-config/express.eslint.config';

// Create an instance of ESLint with the configuration
function createESLintInstance(overrideConfig = {}) {
  return new ESLint({
    overrideConfigFile: true,
    overrideConfig: {
      ...expressConfig,
      ...overrideConfig
    },
    fix: true,
  });
}

// Usage example
const eslint = createESLintInstance({
  rules: {
    'no-console': 'warn' // Custom override
  }
});

// Lint and fix files
async function lintFiles(filePaths) {
  const results = await eslint.lintFiles(filePaths);
  
  // Apply fixes
  await ESLint.outputFixes(results);
  
  // Format results
  const formatter = await eslint.loadFormatter('stylish');
  const resultText = formatter.format(results);
  
  console.log(resultText);
}

export { createESLintInstance, lintFiles };
```

## Step 4: TypeScript Configuration

If using TypeScript, ensure you have a `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

## Step 5: Package.json Scripts

Add useful scripts to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "lint:check": "eslint . --max-warnings 0",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

## Step 6: VS Code Integration (Optional)

Create `.vscode/settings.json` for better IDE integration:

```json
{
  "eslint.enable": true,
  "eslint.format.enable": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## Customization Examples

### Adding Custom Rules

```javascript
// eslint.config.js
import expressConfig from '@chinaza/eslint-config/express.eslint.config';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...expressConfig,
  {
    rules: {
      'no-console': 'warn',
      'prefer-const': 'error',
      'handle-callback-err': 'error',
    }
  }
);
```

### Environment-Specific Rules

```javascript
// eslint.config.js
import expressConfig from '@chinaza/eslint-config/express.eslint.config';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...expressConfig,
  {
    files: ['src/**/*.{js,ts}'],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    }
  }
);
```

### Multiple Project Configuration

```javascript
// eslint.config.js
import expressConfig from '@chinaza/eslint-config/express.eslint.config';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...expressConfig,
  {
    files: ['packages/*/src/**/*.{js,ts}'],
    languageOptions: {
      parserOptions: {
        project: ['packages/*/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
);
```

## Troubleshooting

### Common Issues

1. **TypeScript Project Not Found**: Ensure `tsconfig.json` is in the correct location
2. **Import Errors**: Check that all dependencies are installed
3. **Config Not Applied**: Verify the flat config format is being used (ESLint 9.x)

### Migration from Legacy Config

If migrating from ESLint 8.x:

```javascript
// Old (.eslintrc.js)
module.exports = {
  extends: ['@chinaza/eslint-config/express']
};

// New (eslint.config.js)
import expressConfig from '@chinaza/eslint-config/express.eslint.config';
export default expressConfig;
```

## Best Practices

1. **Gradual Adoption**: Start with warnings, then upgrade to errors
2. **Team Consistency**: Ensure all team members use the same configuration
3. **CI Integration**: Run linting in your CI/CD pipeline
4. **Regular Updates**: Keep the config package updated for latest rules

For more examples, see the `examples/` directory in this package.