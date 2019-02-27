Feature: Cookies page
  In order to facilitate the beta HTBHF programme
  As a potential claimant
  I want to see the details of how cookies are use during the application process

  Scenario: The cookie page is accessible
    Given I navigate to the HTBHF overview page
    When I click the Cookies link
    Then the cookies page is shown
    And all page content is present on the cookies page

  Scenario: The back link on the Cookies page is not shown if we navigate to it directly
    When I navigate to the cookies page
    Then the cookies page is shown
    And no back link is shown

  Scenario: The back link on the Cookies page is shown when the page is accessed via a link on an application page
    Given I am on the enter name page
    When I click on the cookies link
    Then the cookies page is shown
    And the back link on the cookies page links to the enter name page
