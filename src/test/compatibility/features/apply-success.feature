Feature:
  In order to apply for the HTBHF programme
  As a potential claimant
  I want to enter my details and complete the application journey

  Scenario: Valid application details can be checked
    Given I am on the first page of the application
    When I complete the application with valid details
    Then I am shown the check details page
