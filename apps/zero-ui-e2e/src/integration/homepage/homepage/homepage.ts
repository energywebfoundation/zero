import { When, Then } from 'cypress-cucumber-preprocessor/steps';

When('I navigate to the home page', () => {
  cy.visit('/');
});

Then('I see the home page', () => {
  cy.get('h1').should('be.visible');
});
