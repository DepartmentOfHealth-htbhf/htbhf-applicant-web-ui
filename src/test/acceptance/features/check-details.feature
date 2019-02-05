Feature: Complete application journey
  In order to apply for the HTBHF programme
  As a potential claimant
  I want to enter my details and complete the application journey

  Scenario: Valid application details are shown on the check details page
    Given I am on the first page of the application
    When I complete the application with valid details
    Then I am shown the check details page
    And the check details page contains all data entered
    And all page content is present on the check details page
