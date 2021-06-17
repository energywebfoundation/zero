Feature: Background Section

  Background:
    Given counter has been reset

  Scenario: Basic example #1
    When counter is incremented
    Then counter equals 1

  Scenario: Basic example #2
    When counter is incremented
    When counter is incremented
    Then counter equals 2
