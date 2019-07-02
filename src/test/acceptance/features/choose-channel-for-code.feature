Feature: We're going to send you a code
  In order to apply for the HTBHF programme
  As a potential claimant
  I want to select text or email to receive my code

  Background:
    Given I have entered my details up to the choose channel for code page

  Scenario: Text and Email are displayed
    Then Text and Email options are displayed on the choose channel for code page

  Scenario: Do not select an option
    When I do not select an option
    And I click continue
    Then I am informed that I need to select an option for choose channel for code

  Scenario: Select the Text option
    When I select Text as the method to receive the code
    And I click continue
    Then I am shown the check details page

  Scenario: Select the Email option
    When I select Email as the method to receive the code
    And I click continue
    Then I am shown the check details page
