Feature: Unsuccessful application
  In order to apply for the Apply for Healthy Start programme
  As a potential claimant
  If my claim is unsuccessful I want feedback about why my claim was unsuccessful

  @RequiresWiremock
  Scenario Outline: When a claimant applies for Apply for Healthy Start and is unsuccessful they are told why
    Given I am on the first page of the application
    When I submit an application which returns a <status> eligibility status
    Then I am shown the application unsuccessful page
    And the page content displays that I am not eligible because my eligibility status is <status>

    Examples:
      | status     |
      | INELIGIBLE |
      | PENDING    |
      | NO_MATCH   |
      | ERROR      |
      | DUPLICATE  |
