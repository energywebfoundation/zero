Feature: A user signs in to the system

    # This is related to User story ZR-90

    # As a BUYER or SELLER,
    # I need to be able to login into the system using my credentials,
    # in order to access my buyer/seller Dashboard.

Background: Sign in background
  Given the user is unauthenticated
    And the user is at the "/login" page

Scenario: Correct login
   Given the user is registered
     And all mandatory fields in "/login" page are completed correctly
    When the user submits the information in "/login" page
    Then the system redirects the user to the corresponding dashboard

Scenario: No Login due to incorrect password
   Given the user is registered
     And the provided password: "incorrectPassword" is incorrect
    When the user submits the information in "/login" page
    Then the system presents to the user the corresponding error message

 Scenario: No login due to non existing user
   Given the user is unregistered
     And all mandatory fields in "/login" page are completed correctly
     And the provided username: "nonExistingUsername" does not exist in system database
    When the user submits the information in "/login" page
    Then the system presents to the user the corresponding error message

 # Scenario: No login and account blocked
 #  Given the user is registered
 #    And the user has committed at least three submissions errors
 #   When the user submits the information
 #   Then the system presents to the user the corresponding error message
 #    And the system should block the user account


