Feature: Temporary overview page
  In order to facilitate the beta HTBHF programme
  As a potential claimant
  I want to see the temporary overview page before I start the application process

  Scenario: The overview page is available and starts the application process
    Given I navigate to the HTBHF overview page
    When I select to start the process
    Then the enter name page is shown

  Scenario: The cookie page is accessible
    Given I navigate to the HTBHF overview page
    When I click the Cookies link
    Then the cookies page is shown
    And all page content is present on the cookies page
