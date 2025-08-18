// examples/ionic-usage-example.js
// This file demonstrates how to use the Ionic React ESLint configuration

// Example 1: Basic usage - import the config directly
import ionicConfig from '@chinaza/eslint-config/ionic.eslint.config';

export default ionicConfig;

// Example 2: Extending the configuration for Ionic + Capacitor projects
import ionicConfig from '@chinaza/eslint-config/ionic.eslint.config';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...ionicConfig,
  {
    // Ionic-specific customizations
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // Ionic components often use kebab-case
      'react/jsx-pascal-case': ['error', { allowAllCaps: true, ignore: ['ion-*'] }],
      
      // Mobile development considerations
      '@typescript-eslint/no-floating-promises': 'warn', // Async operations common
      'no-console': 'off', // Useful for debugging on device
      
      // Performance for mobile
      'react/jsx-no-bind': 'warn',
      'react/jsx-no-literals': 'off', // Ionic uses lots of string literals
    }
  }
);

// Example 3: Configuration with Capacitor plugins
import ionicConfig from '@chinaza/eslint-config/ionic.eslint.config';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...ionicConfig,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        // Capacitor globals
        Capacitor: 'readonly',
        CapacitorGlobal: 'readonly',
      },
    },
    rules: {
      // Allow platform-specific code
      '@typescript-eslint/no-unnecessary-condition': 'off',
      'no-restricted-globals': ['error', 'event'], // Prevent DOM event conflicts
    }
  },
  {
    // Capacitor native code
    files: ['android/**/*.java', 'ios/**/*.swift'],
    rules: {
      // Disable JS/TS rules for native code
      '@typescript-eslint/no-unused-vars': 'off',
    }
  }
);

// Example 4: Storybook integration for component development
import ionicConfig from '@chinaza/eslint-config/ionic.eslint.config';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...ionicConfig,
  {
    // Storybook configuration
    files: ['**/*.stories.{ts,tsx}', '.storybook/**/*.{js,ts}'],
    rules: {
      'react-refresh/only-export-components': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/display-name': 'off',
    }
  }
);

// Example 5: PWA and Service Worker configuration
import ionicConfig from '@chinaza/eslint-config/ionic.eslint.config';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...ionicConfig,
  {
    // Service Worker files
    files: ['public/sw.js', 'src/serviceWorker.ts'],
    languageOptions: {
      globals: {
        self: 'readonly',
        clients: 'readonly',
        importScripts: 'readonly',
      },
    },
    rules: {
      'no-console': 'off', // Useful for SW debugging
      '@typescript-eslint/no-explicit-any': 'off',
    }
  }
);