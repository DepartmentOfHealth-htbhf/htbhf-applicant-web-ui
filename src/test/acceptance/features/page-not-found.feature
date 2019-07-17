Feature: Page Not Found
  In order to facilitate the beta Apply for Healthy Start programme
  As a potential claimant
  I want to see the page not found page if I go to a page that does not exist.

  Scenario: Going to a non-existent url displays a Page Not Found page
    When I go to a non-existent page
    Then I am shown the Page Not Found page
