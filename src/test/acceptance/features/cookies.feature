Feature: Cookies page
  In order to facilitate the beta Apply for Healthy Start programme
  As a potential claimant
  I want to see the details of how cookies are use during the application process

  Scenario: The back link on the Cookies page is not shown if we navigate to it directly
    When I navigate to the cookies page
    Then the cookies page is shown
    And no back link is shown
