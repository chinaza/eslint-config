# Changelog

All notable changes to this project will be documented in this file.

## [2.1.0] - 2024-01-XX

### Added
- **Enhanced Express ESLint Configuration**: Complete rewrite with modern flat config format
  - Separate configurations for JavaScript and TypeScript files
  - Comprehensive security rules (no-eval, no-implied-eval, etc.)
  - Node.js and Express.js specific optimizations
  - Test file configurations with relaxed rules
  - Better TypeScript support with proper type checking

- **Enhanced Ionic React ESLint Configuration**: Complete rewrite with mobile development focus
  - React 17+ support (no React import needed)
  - Ionic component compatibility (ion-* components)
  - Capacitor integration support
  - Mobile performance optimizations
  - PWA and Service Worker configurations
  - Testing framework integration (Jest, Cypress)

- **Comprehensive Documentation**:
  - Updated README with flat config examples
  - New INTEGRATION_GUIDE.md for Express projects
  - New IONIC_INTEGRATION_GUIDE.md for Ionic projects
  - Usage examples in examples/ directory

- **Example Configurations**:
  - express-usage-example.js - Various Express config patterns
  - sample-express-eslint.config.js - Complete Express project setup
  - ionic-usage-example.js - Various Ionic config patterns
  - sample-ionic-eslint.config.js - Complete Ionic project setup

### Changed
- **Breaking**: Updated to ESLint 9.x flat configuration format
- **Breaking**: Changed import paths to use full file extensions
- Improved TypeScript rules with proper base rule disabling
- Enhanced security and best practice rules
- Better mobile development optimizations for Ionic
- Updated peer dependencies to ESLint 9.x

### Fixed
- Proper prettier integration with correct import paths
- TypeScript configuration issues with project references
- React rules compatibility with modern React patterns

### Dependencies
- Added @eslint/js as direct dependency
- Updated typescript-eslint integration
- Maintained compatibility with existing prettier setup

## [2.0.5] - Previous Release
- Legacy configuration support
- Basic Express and Ionic configurations