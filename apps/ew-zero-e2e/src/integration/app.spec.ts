import { getGreeting } from '../support/app.po';

describe('ew-zero', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to Energy Web Foundation Zero project!');

  });
});
