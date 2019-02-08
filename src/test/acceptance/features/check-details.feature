Feature: Check details
  In order to apply for the HTBHF programme
  As a potential claimant
  I want to enter my details and check that my details are correct before completing my application

  Scenario: Valid application details for a pregnant woman are shown on the check details page
    Given I am on the first page of the application
    When I complete the application with valid details for a pregnant woman
    Then I am shown the check details page
    And the check details page contains all data entered for a pregnant woman
    And all page content is present on the check details page

  Scenario: Valid application details for a woman who is not pregnant are shown on the check details page
    Given I am on the first page of the application
    When I complete the application with valid details for a woman who is not pregnant
    Then I am shown the check details page
    And the check details page contains all data entered for a woman who is not pregnant

  Scenario: Valid application details for an applicant with no second line of address are shown on the check details page
    Given I am on the first page of the application
    When I complete the application with valid details for an applicant with no second line of address
    Then I am shown the check details page
    And the check details page contains all data entered for an applicant with no second line of address

  Scenario: I can change my answer to a question and am returned to the check details page with the correct information
    Given I am on the check details page having entered valid details for a pregnant woman
    When I choose to change my answer to are you pregnant
    And I select the No option
    And I click continue
    Then I am shown the check details page
    And the check details page contains all data entered for a woman who is not pregnant
