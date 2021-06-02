Feature: Basic Search

  Scenario: BUYER executes a basic search
    Given the buyer is at the "/basicsearch" page
     When the buyer searchs for products
     Then the system get as a result a list of products that match the selected criteria
      And the buyer is redirected to the "/searchresults" page

  Scenario: BUYER executes a basic search by ANY DEVICES selector
    Given the buyer is at the "/basicsearch" page
      And the 'Device' indicator is equal to True
     When the buyer searchs for products
     Then the system get as a result a list of all the products with a valid 'Device' associated
      And the buyer is redirected to the "/searchresults" page

  Scenario: BUYER executes a basic search by ANY PRODUCT TYPES selector
    Given the buyer is at the "/basicsearch" page
      And the 'Product Type' indicator is equal to True
     When the buyer searchs for products
     Then the system get as a result a list of all the products with a valid 'Product Type' associated
      And the buyer is redirected to the "/searchresults" page

  Scenario: BUYER revisit a basic search page
    Given the buyer is at the "/searchresults" page
     When the buyer goes back to the "/basicsearch" page
     Then the values on the filters of the search criteria should be persisted

  #Scenario: Search rules for similar Match for "ENERGY AMOUNT" filter
  #  Given the buyer is at the "/basicsearch" page
  #    And the repository of products has the following structure:
  #    |  region  | device_type | product_type | energy_amount | gen_START_Date | gen_END_date |
  #    | Thailand | SOLAR       |    EACs      |   700         |   10/01/2020   | 10/01/2021   |
  #    | Thailand | SOLAR       |    EACs      |   600         |   10/02/2020   | 10/01/2022   |
  #    | Thailand | WIND        |    EACs      |   690         |   10/01/2021   | 10/05/2022   |
  #    And the ENERGY AMOUNT filter is equals to 690
  #   When the buyer searchs for products
  #   Then The system get as a result a list of products only with records 2 and 3

  Scenario: Basic search executed is saved as a "Recent Search"
    Given the buyer is at the "/basicsearch" page
     When the buyer searchs for products
     Then the executed basic search is saved and able to be fund as a Recent Search

  Scenario: Basic search not executed due to unfilled mandatory "Region" field
    Given the buyer is at the "/basicsearch" page
      And the Region filter has no selection
     When the buyer searchs for products
     Then The system presents to the buyer the corresponding error message

  Scenario: Search button product counter
    Given the buyer is at the "/basicsearch" page
     When the buyer have modified at least one of the criteria fields in the search form
     Then the Search Button label is modified including the number of products matching the current criteria



