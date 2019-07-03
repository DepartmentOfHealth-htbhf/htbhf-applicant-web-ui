Feature: Enter confirmation code
  In order to apply for the HTBHF programme
  As a potential claimant
  I want to enter my confirmation code

  Background:
    Given I have entered my details up to the enter code page

  Scenario: Enter my confirmation code
    When I enter my confirmation code
    Then I am shown the check details page

  Scenario: Do not enter a confirmation code
    When I do not enter a confirmation code
    Then I am informed that I must enter in the code that was sent to me
