/* eslint-disable @typescript-eslint/no-empty-function */
import { When, Then, Given } from 'cypress-cucumber-preprocessor/steps';

Given('all mandatory fields in {string} page are completed correctly', (pageName) => {
  console.log(pageName)
});

Given('the provided password: {string} is incorrect', (password) => {
  console.log(password)
});

Given('the provided username: {string} does not exist in system database', (username) => {
  console.log(username)
});


When('the user submit the information', () => {});

Then('The system redirects the user to the corresponding dashboard', () => {});

Then('The system presents to the user the corresponding error message', () => {});
