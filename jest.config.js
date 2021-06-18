module.exports = {
  setupFilesAfterEnv: ['jest-extended'],
  projects: [
    '<rootDir>/apps/zero',
    '<rootDir>/apps/zero-api',
    '<rootDir>/libs/ui/forms',
    '<rootDir>/libs/ui/core',
    '<rootDir>/libs/ui/theme',
    '<rootDir>/libs/store',
    '<rootDir>/libs/store/configure',
    '<rootDir>/libs/store/app-shared-state',
    '<rootDir>/libs/localization',
    '<rootDir>/libs/buyer',
    '<rootDir>/libs/seller',
  ],
};
