Feature: Smoke test
  In order facilitate the beta Apply for Healthy Start programme
  As the continuous delivery pipeline
  I want know that a new release has deployed correctly and is functional

  Scenario: The overview page is available and starts the application process
    Given I navigate to the Apply for Healthy Start overview page
    When I select to start the process
    Then I am shown the first page of the application
