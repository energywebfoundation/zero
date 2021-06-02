/* eslint-disable @typescript-eslint/no-empty-function */
import { When, Then, Given } from 'cypress-cucumber-preprocessor/steps';


Given('the {string} indicator is equal to True', (filterIndicator) => {
  console.log(filterIndicator)
 });

Given('the Region filter has no selection', () => { });

//--

When("the buyer searchs for products", () => { });

When("the buyer goes back to the {string} page", (pageName) => {
  console.log(pageName)
});

When("the buyer have modified at least one of the criteria fields in the search form", () => { });

//--

Then('the system get as a result a list of products that match the selected criteria', () => { });

Then('the buyer is redirected to the {string} page', (pageName) => {
  console.log(pageName)
});

Then('the system get as a result a list of all the products with a valid {string} associated', (filterIndicator) => {
  console.log(filterIndicator)
});

Then('the values on the filters of the search criteria should be persisted', () => { });

Then('the executed basic search is saved and able to be fund as a Recent Search', () => { });

Then('The system presents to the buyer the corresponding error message', () => {});

Then('the Search Button label is modified including the number of products matching the current criteria', () => {});

