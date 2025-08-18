// examples/express-usage-example.js
// This file demonstrates how to use the Express ESLint configuration

// Example 1: Basic usage - import the config directly
import expressConfig from '@chinaza/eslint-config/express.eslint.config';

export default expressConfig;

// Example 2: Extending the configuration with custom rules
import expressConfig from '@chinaza/eslint-config/express.eslint.config';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...expressConfig,
  {
    // Add custom rules for your project
    rules: {
      'no-console': 'warn',
      'prefer-const': 'error',
      // Add Express.js specific rules
      'handle-callback-err': 'error',
    }
  }
);

// Example 3: Configuration with project-specific TypeScript settings
import expressConfig from '@chinaza/eslint-config/express.eslint.config';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...expressConfig,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/prefer-readonly': 'warn',
    }
  }
);

// Example 4: Adding environment-specific configurations
import expressConfig from '@chinaza/eslint-config/express.eslint.config';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...expressConfig,
  {
    // Development environment
    files: ['src/**/*.{js,ts}'],
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
    }
  },
  {
    // Production environment - stricter rules
    files: ['dist/**/*.{js,ts}'],
    rules: {
      'no-console': 'error',
      'no-debugger': 'error',
    }
  }
);