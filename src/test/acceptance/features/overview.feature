Feature:
  In order facilitate the beta HTBHF programme
  As a potential claimant
  I want to see the temporary overview page before I start the application process

  Scenario: The overview page is available and starts the application process
    Given I navigate to the HTBHF overview page
    When I select to start the process
    Then the enter national insurance page is shown
