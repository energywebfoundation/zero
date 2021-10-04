/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { When, Then, Given } from 'cypress-cucumber-preprocessor/steps';

// This means that the has already registered the account
// but still does not activate it with the email link
Given('the user account is not activated', () => {});

//This means that we have proves that we've sent the email to the user
Given('the user has received an activation email', () => {});

Given('4 weeks have passed since the activation email was sent', () => {});

//This means that we have proves that the user has selected the activation link
When('the user selects the activation link', () => {});

Then('the user should have the account activated', () => {});

Then('the user should not have the account activated', () => {});

Then('the user is logged in', () => {});

Then(
  'the user is taken to EW-Zero Landing Page for new {string}',
  (roleName) => {}
);

Then('the system should provide the corresponding error message', () => {});
