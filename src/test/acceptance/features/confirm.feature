Feature: Confirm application
  In order to apply for the HTBHF programme
  As a potential claimant
  I want to be shown the decision after submitting my application details

  Scenario: Valid application progresses to the confirmation page
    Given I am on the first page of the application
    When I submit an application with valid details
    Then I am shown the confirm details page
    And all page content is present on the confirm details page
    And my entitlement is 12.40 per week

  @RequiresWiremock
  Scenario: Valid application to update existing claim progresses to the confirmation page
    Given I am on the first page of the application
    When I submit an application to update an existing claim
    Then I am shown the confirm updated page
    And I am informed that my claim has been updated
    And my entitlement is 12.40 per week
