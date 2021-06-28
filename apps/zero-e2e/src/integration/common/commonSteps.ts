/* eslint-disable @typescript-eslint/no-empty-function */
import { Given } from "cypress-cucumber-preprocessor/steps";


Given('the user is unregistered', () => {});


Given('the user is at the {string} page', (pageName) => {
  console.log(pageName)
});

// similar than previous one, but also checking that the user's role is = BUYER
Given('the buyer is at the {string} page', (pageName) => {
  console.log(pageName)
});
