Feature: A BUYER sign in into de System

    As a BUYER,
    I need to be able to login into the system using my credentials,
    in order to access my buyer Dashboard.

Background: login background
  Given the user is unregistered
    And the user is at the "/login" page

Scenario: Correct login
   Given all mandatory fields in "/login" page are completed correctly
    When the user submits the information
    Then The system redirects the user to the corresponding dashboard

Scenario: No Login due to incorrect password
   Given the provided password: "incorrectPassword" is incorrect
    When the user submits the information
    Then The system presents to the user the corresponding error message

 Scenario: No login due to non existing user
   Given all mandatory fields in "/login" page are completed correctly
     And the provided username: "nonExistingUsername" does not exist in system database
    When the user submits the information
    Then The system presents to the user the corresponding error message

  Scenario: No login and account blocked
   Given the user has committed at least three submissions errors
    When the user submits the information
    Then The system presents to the user the corresponding error message
     And the system should block the user account


