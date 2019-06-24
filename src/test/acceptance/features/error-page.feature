Feature: Server Error page
  In order to facilitate the beta HTBHF programme
  As a potential claimant
  I want to see the Server Error page when an error occurs with the application

  @RequiresWiremock
  Scenario: An error in the application displays the Server Error page
    Given I have entered my details up to the check details page
    And I accept the terms and conditions
    When An error occurs after clicking the submit button
    Then I am shown the Server Error page
