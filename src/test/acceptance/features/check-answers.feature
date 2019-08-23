Feature: Check answers
  In order to apply for the Apply for Healthy Start programme
  As a potential claimant
  I want to enter my details and check that my details are correct before completing my application

  Scenario: Valid application details for a pregnant woman are shown on the check answers page
    Given I am on the first page of the application
    When I complete the application with valid details for a pregnant woman
    Then I am shown the check answers page
    And the check answers page contains all data entered for a pregnant woman
    And all page content is present on the check answers page

  Scenario: Valid application details for a woman who is not pregnant are shown on the check answers page
    Given I am on the first page of the application
    When I complete the application with valid details for a woman who is not pregnant
    Then I am shown the check answers page
    And the check answers page contains all data entered for a woman who is not pregnant

  Scenario: Valid application details for an applicant with no second line of address are shown on the check answers page
    Given I am on the first page of the application
    When I complete the application with valid details for an applicant with no second line of address
    Then I am shown the check answers page
    And the check answers page contains all data entered for an applicant with no second line of address

  Scenario: Valid application details for an applicant with no county are shown on the check answers page
    Given I am on the first page of the application
    When I complete the application with valid details for an applicant with no county
    Then I am shown the check answers page
    And the check answers page contains all data entered for an applicant with no county

  Scenario: I can change my answer to a question and am returned to the check answers page with the correct information
    Given I am on the check answers page having entered valid details for a pregnant woman
    When I choose to change my answer to are you pregnant
    And I say No to the are you pregnant question
    And I click continue
    Then I am shown the check answers page
    And the check answers page contains all data entered for a woman who is not pregnant

  Scenario: An application that contains malicious input is sanitised
    Given I am on the first page of the application
    When I complete the application with valid details that contains malicious input
    Then I am shown the check answers page

  Scenario: Clicking on the back link takes me to the last navigable page
    Given I have entered my details up to the check answers page
    Then The back link on the check answers page links to the email address page
