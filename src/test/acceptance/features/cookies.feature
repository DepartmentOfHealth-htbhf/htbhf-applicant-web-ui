Feature: Cookies page
  In order to facilitate the beta HTBHF programme
  As a potential claimant
  I want to see the details of how cookies are use during the application process

  Scenario: The cookie page is accessible
    Given I navigate to the HTBHF overview page
    When I click the Cookies link
    Then the cookies page is shown
    And all page content is present on the cookies page
