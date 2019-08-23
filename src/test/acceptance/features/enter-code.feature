Feature: Enter confirmation code
  In order to apply for the Apply for Healthy Start programme
  As a potential claimant
  I want to enter my confirmation code

  Background:
    Given I have entered my details up to the enter code page

  Scenario: Enter my confirmation code
    When I enter my confirmation code
    Then I am shown the check answers page

  Scenario: Do not enter a confirmation code
    When I do not enter a confirmation code
    Then I am informed that I must enter in the code that was sent to me

  Scenario: Request a new code link takes me to the send code page
    Then The request a new code link points to the send code page

  Scenario: Enter in the wrong confirmation code
    When I enter in the wrong confirmation code
    Then I am informed that I must enter in the code that was sent to me
