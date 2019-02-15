Feature: Confirm application
  In order to apply for the HTBHF programme
  As a potential claimant
  I want to be shown the decision after submitting my application details

  Scenario: Valid application progresses to the confirmation page
    Given I am on the first page of the application
    When I submit an application with valid details
    Then I am shown the confirm details page
    And all page content is present on the confirm details page
