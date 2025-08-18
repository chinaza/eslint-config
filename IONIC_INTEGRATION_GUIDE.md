# Ionic React ESLint Integration Guide

This guide shows you how to integrate `@chinaza/eslint-config` into your Ionic React projects for optimal mobile development.

## Step 1: Installation

Install the required dependencies for your Ionic React project:

```bash
npm install -D @chinaza/eslint-config eslint prettier typescript-eslint
```

## Step 2: Basic Configuration

Create an ESLint configuration file using the flat configuration format:

```bash
touch eslint.config.js
```

Add the following code to `eslint.config.js`:

```javascript
// eslint.config.js
import ionicConfig from '@chinaza/eslint-config/ionic.eslint.config';

export default ionicConfig;
```

## Step 3: Ionic-Specific Customizations

For Ionic projects, you'll want to customize the configuration to handle Ionic components:

```javascript
// eslint.config.js
import ionicConfig from '@chinaza/eslint-config/ionic.eslint.config';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...ionicConfig,
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // Allow Ionic components (ion-button, ion-content, etc.)
      'react/jsx-pascal-case': ['error', { 
        allowAllCaps: true, 
        ignore: ['ion-*'] 
      }],
      
      // Mobile development considerations
      '@typescript-eslint/no-floating-promises': 'warn', // Async operations are common
      'no-console': 'warn', // Useful for device debugging
      
      // Performance for mobile devices
      'react/jsx-no-bind': 'warn', // Avoid creating functions in render
    }
  }
);
```

## Step 4: Capacitor Integration

If you're using Capacitor for native functionality:

```javascript
// eslint.config.js
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
      // Native API integration often requires these relaxations
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    }
  }
);
```

## Step 5: Project Structure Configuration

Customize rules based on your project structure:

```javascript
// eslint.config.js
import ionicConfig from '@chinaza/eslint-config/ionic.eslint.config';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...ionicConfig,
  
  // Page components (can be more complex)
  {
    files: ['src/pages/**/*.{ts,tsx}'],
    rules: {
      'react/jsx-max-depth': ['warn', { max: 8 }], // Pages can be deeply nested
      '@typescript-eslint/no-floating-promises': 'off', // Pages handle many async operations
    }
  },
  
  // Reusable components (stricter rules)
  {
    files: ['src/components/**/*.{ts,tsx}'],
    rules: {
      'react/jsx-props-no-spreading': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'warn',
    }
  }
);
```

## Step 6: Testing Configuration

Configure for popular Ionic testing setups:

```javascript
// eslint.config.js
import ionicConfig from '@chinaza/eslint-config/ionic.eslint.config';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...ionicConfig,
  
  // Unit tests with React Testing Library
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    languageOptions: {
      globals: {
        render: 'readonly',
        screen: 'readonly',
        fireEvent: 'readonly',
        waitFor: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
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
      },
    },
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    }
  }
);
```

## Step 7: PWA and Service Worker Support

For Progressive Web App features:

```javascript
// eslint.config.js
import ionicConfig from '@chinaza/eslint-config/ionic.eslint.config';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...ionicConfig,
  
  // Service Worker files
  {
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
```

## Step 8: Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "lint:check": "eslint src --ext .ts,.tsx --max-warnings 0",
    "format": "prettier --write src",
    "format:check": "prettier --check src",
    "type-check": "tsc --noEmit"
  }
}
```

## Step 9: TypeScript Configuration

Ensure your `tsconfig.json` is optimized for Ionic:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ES6"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src",
    "capacitor.config.ts"
  ]
}
```

## Step 10: VS Code Integration

Create `.vscode/settings.json` for optimal development experience:

```json
{
  "eslint.enable": true,
  "eslint.format.enable": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## Common Ionic Patterns

### 1. Ion Component Usage

```tsx
// ✅ Good - Ionic components are properly formatted
<IonContent>
  <IonButton expand="block" fill="clear">
    Click me
  </IonButton>
</IonContent>

// ❌ Bad - Unnecessary attributes
<IonButton expand="block" fill="clear" disabled={false}>
  Click me
</IonButton>
```

### 2. Capacitor Plugin Usage

```tsx
// ✅ Good - Proper error handling
const takePicture = async () => {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    setPhotoUri(image.webPath);
  } catch (error) {
    console.error('Error taking picture:', error);
  }
};

// ❌ Bad - Unhandled promise
const takePicture = () => {
  Camera.getPhoto({ quality: 90 }); // ESLint will warn about floating promise
};
```

### 3. Performance Optimization

```tsx
// ✅ Good - Memoized callback
const handleClick = useCallback(() => {
  // Handle click
}, [dependency]);

// ❌ Bad - Function created on every render
<IonButton onClick={() => handleSomething()}>
  Click me
</IonButton>
```

## Troubleshooting

### Common Issues

1. **Ionic Components Not Recognized**: Add `'ion-*'` to ignore patterns in `react/jsx-pascal-case`
2. **Capacitor Types**: Install `@capacitor/core` types package
3. **Build Errors**: Ensure TypeScript configuration matches ESLint expectations

### Performance Tips

1. **Use Ion Virtual Scroll**: For long lists on mobile devices
2. **Implement Lazy Loading**: For routes and heavy components
3. **Optimize Images**: Use appropriate formats and sizes for mobile

For more examples, see the `examples/` directory in this package.