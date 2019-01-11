Feature:
  In order apply for HTBHF programme
  As a potential claimant
  I want to enter my name
  Background:
    Given I start the application process

  Scenario: Fill “First name” textbox with text which exceeds maximum length
    When I enter a first name which is too long
    Then I am informed that the first name is too long

  Scenario: Fill “Last name” textbox with text which exceeds maximum length
    When I enter a last name which is too long
    Then I am informed that the last name is too long

  Scenario: Fail to fill “Last name” textbox shows error
    When I enter first name only
    Then I am informed that a last name is required

