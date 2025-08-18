// examples/sample-express-eslint.config.js
// Sample ESLint configuration for an Express.js project using @chinaza/eslint-config

import expressConfig from '@chinaza/eslint-config/express.eslint.config';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Import the base Express configuration
  ...expressConfig,
  
  // Project-specific overrides
  {
    files: ['src/**/*.{js,ts}'],
    rules: {
      // Customize rules for your Express app
      'no-console': 'warn', // Allow console in development
      '@typescript-eslint/no-explicit-any': 'warn', // Be lenient with any types during development
    }
  },
  
  // Stricter rules for production code
  {
    files: ['src/routes/**/*.{js,ts}', 'src/controllers/**/*.{js,ts}'],
    rules: {
      'handle-callback-err': 'error', // Critical for Express route handlers
      '@typescript-eslint/no-floating-promises': 'error', // Important for async route handlers
      'no-unused-vars': 'error',
    }
  },
  
  // Relaxed rules for test files
  {
    files: ['**/*.test.{js,ts}', '**/*.spec.{js,ts}', 'tests/**/*'],
    rules: {
      'no-console': 'off', // Allow console in tests
      '@typescript-eslint/no-explicit-any': 'off', // Allow any in tests for mocking
      '@typescript-eslint/no-non-null-assertion': 'off', // Allow ! operator in tests
    }
  },
  
  // Configuration files can have looser rules
  {
    files: ['*.config.{js,ts}', 'scripts/**/*'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    }
  }
);