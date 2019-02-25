Feature: Cookies details page
  In order to apply for the HTBHF programme
  As a potential claimant
  I want to view the cookies used by the site

  Scenario: The cookie back link is not shown if we navigate directly to it
    When I go directly to the cookies page
    Then the cookies page is shown
    And no back link is shown

  Scenario: The cookie back link is shown and links to the last page in the application
    Given I am on the enter name page
    When I click on the cookies link
    Then the cookies page is shown
    And the back link on the cookies page links to the enter name page
