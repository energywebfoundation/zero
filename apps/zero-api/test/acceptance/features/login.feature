Feature: A user signs in to the system

    # This is related to User story ZR-90

    # As a BUYER or SELLER,
    # I need to be able to login into the system using my credentials,
    # in order to access my buyer/seller Dashboard.

# Background: Sign in background
#  Given the user is unauthenticated
#    And the user is at the "/login" page

Scenario: Correct login
   Given the user "testuser7@foo.bar" is registered
     And username "testuser7@foo.bar" and password "testing12345" are completed correctly
    When the user submits the information
    Then the system responds with a "200" status
     # And the user receives a valid token

Scenario: Incorrect login
   Given the user "testuser7@foo.bar" is registered
     And username "testuser7@foo.bar" and password "incorrectpassword" are completed correctly
    When the user submits the information
    Then the system responds with a "401" status
     # And the user receives a valid token
