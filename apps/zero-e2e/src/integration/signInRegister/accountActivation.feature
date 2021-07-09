Feature: A user activates a user account

# This is related to User story ZR-87

    # As a BUYER or SELLER,
    # I want to be able to properly activate my Zero account,
    # in order to access and start using it.

Background: account activation background
     Given the user is registered
       And the user account is not activated

Scenario: Correct account activation
Given the user has received an activation email
  And the user role is a:
      | role   |
      | buyer  |
      | seller |
 When the user selects the activation link
 Then the user should have the account activated
  And the user is logged in
  And the user is taken to EW-Zero Landing Page for new "<role>"

 Scenario: No account activation due to out-of-date
Given the user has received an activation email
  And the user role is a:
      | role   |
      | buyer  |
      | seller |
  And 4 weeks have passed since the activation email was sent
 When the user selects the activation link
 Then the user should not have the account activated
  And the system should provide the corresponding error message
