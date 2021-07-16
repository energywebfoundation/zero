/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Given } from "cypress-cucumber-preprocessor/steps";


//This means that user has no account created into the system
Given('the user is unregistered', () => {});

//Check the role of the user to be a buyer or a seller
Given('the user role is a:', (dataTable) => {});

//This means that user has an account created into the system
Given('the user is registered', () => {});

//This means that user has an account created, but is currently logged off
Given('the user is unauthenticated', () => {});

//Check that any user is at the {string} page
Given('the user is at the {string} page', (pageName) => {});

//Check that the BUYER user is at the {string} page
Given('the buyer is at the {string} page', (pageName) => {});
