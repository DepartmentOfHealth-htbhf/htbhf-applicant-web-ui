Feature: Unsuccessful application
  In order to apply for the HTBHF programme
  As a potential claimant
  If my claim is unsuccessful I want to be shown the why my claim was unsuccessful

  Scenario Outline: When a claimant applies for help to buy healthy foods and is unsuccessful they are told why
    Given I am on the first page of the application
    When I submit an application which returns a <status> status
    Then I am shown the application unsuccessful page
    And the page content displays that I am not eligible because my status is <status>

    Examples:
      | status     |
      | INELIGIBLE |
      | PENDING    |
      | NOMATCH    |
      | ERROR      |
      | DUPLICATE  |
