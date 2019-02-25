Feature: Cookies details page
  In order to apply for the HTBHF programme
  As a potential claimant
  I want to view the cookies used by the site

  Scenario: The back link on the Cookies page is not shown if we navigate to it directly
    When I go directly to the cookies page
    Then the cookies page is shown
    And no back link is shown

  Scenario: The back link on the Cookies page is shown when the page is accessed via a link on an application page
    Given I am on the enter name page
    When I click on the cookies link
    Then the cookies page is shown
    And the back link on the cookies page links to the enter name page
