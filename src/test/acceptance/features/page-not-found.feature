Feature: Temporary overview page
  In order to facilitate the beta HTBHF programme
  As a potential claimant
  I want to see the page not found page if I go to a page that does not exist.

  Scenario: Going to a non-existent url displays a page not found page
    When I go to a non existent page
    Then I am shown the page not found page
