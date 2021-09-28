/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { When, Then, Given } from 'cypress-cucumber-preprocessor/steps';

Given(
  'all mandatory fields in {string} page are completed correctly',
  (pageName) => {}
);

Given('the provided email is already in use in Zero database', () => {});

When('the user submits the information in {string} page', (pageName) => {});

Then('the system should present to the user a Success message', () => {});

Then(
  'the user receives a confirmation email with a link to activate the account',
  () => {}
);

Then('The system should provide the corresponding error message', () => {});
