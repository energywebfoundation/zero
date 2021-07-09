Feature: A user submits the form registration

    #This is related to User story ZR-83

    # As a BUYER or SELLER,
    # I want to create login credentials and a basic user profile,
    # in order to securely access my Buyer or Seller Zero Account.

Background: submit Registration Form background
     Given the user is unregistered
       And the user is at the "/registration" page

  Scenario: Correct user registration
     Given all mandatory fields in "/registration" page are completed correctly
      When the user submits the information in "/registration" page
      Then the system should present to the user a Success message
       And the user receives a confirmation email with a link to activate the account

  Scenario: Email already in use
     Given all mandatory fields in "/registration" page are completed correctly
       But the provided email is already in use in Zero database
      When the user submits the information in "/registration" page
      Then The system should provide the corresponding error message
