const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  setupFilesAfterEnv: ['jest-extended'],
  projects: [...getJestProjects(), '<rootDir>/libs/store'],
};
