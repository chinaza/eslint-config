// examples/sample-ionic-eslint.config.js
// Sample ESLint configuration for an Ionic React project using @chinaza/eslint-config

import ionicConfig from '@chinaza/eslint-config/ionic.eslint.config';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Import the base Ionic configuration
  ...ionicConfig,
  
  // Project-specific overrides for source code
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // Ionic-specific adjustments
      'react/jsx-pascal-case': ['error', { 
        allowAllCaps: true, 
        ignore: ['ion-*'] // Allow Ionic components
      }],
      
      // Mobile development considerations
      'no-console': 'warn', // Keep some logging for device debugging
      '@typescript-eslint/no-floating-promises': 'warn', // Common in mobile async operations
      
      // Performance optimizations for mobile
      'react/jsx-no-bind': 'warn', // Avoid creating functions in render
      'react/jsx-key': 'error', // Critical for list performance
    }
  },
  
  // Capacitor and native integration
  {
    files: ['src/hooks/capacitor/**/*.{ts,tsx}', 'src/services/native/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        Capacitor: 'readonly',
        CapacitorGlobal: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Native APIs often use any
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    }
  },
  
  // Page components (often have different patterns)
  {
    files: ['src/pages/**/*.{ts,tsx}'],
    rules: {
      'react/jsx-max-depth': ['warn', { max: 8 }], // Ionic pages can be deeply nested
      '@typescript-eslint/no-floating-promises': 'off', // Pages handle async operations
    }
  },
  
  // Component library (stricter rules)
  {
    files: ['src/components/**/*.{ts,tsx}'],
    rules: {
      'react/jsx-props-no-spreading': 'warn', // Be careful with prop spreading
      'react/jsx-max-props-per-line': ['warn', { maximum: 3 }],
      '@typescript-eslint/explicit-function-return-type': 'warn', // Better for reusable components
    }
  },
  
  // Test files with Ionic Testing Library
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    languageOptions: {
      globals: {
        // Ionic Testing Library globals
        render: 'readonly',
        screen: 'readonly',
        fireEvent: 'readonly',
        waitFor: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'react/jsx-props-no-spreading': 'off', // Common in test setups
    }
  },
  
  // E2E tests with Cypress
  {
    files: ['cypress/**/*.{js,ts}', '**/*.cy.{js,ts}'],
    languageOptions: {
      globals: {
        cy: 'readonly',
        Cypress: 'readonly',
        expect: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    }
  },
  
  // Configuration files
  {
    files: [
      'vite.config.ts',
      'capacitor.config.ts', 
      'ionic.config.json',
      'tailwind.config.js'
    ],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    }
  }
);