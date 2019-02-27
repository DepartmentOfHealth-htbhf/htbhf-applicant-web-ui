Feature: Smoke test
  In order facilitate the beta HTBHF programme
  As the continuous delivery pipeline
  I want know that a new release has deployed correctly and is functional

  Scenario: The overview page is available and starts the application process
    Given I navigate to the HTBHF overview page
    When I select to start the process
    Then I am shown the enter name page
