Feature: Temporary overview page
  In order to facilitate the beta Apply for Healthy Start programme
  As a potential claimant
  I want to see the temporary overview page before I start the application process

  Scenario: The overview page is available and starts the application process
    Given I navigate to the Apply for Healthy Start overview page
    When I select to start the process
    Then I am shown the first page of the application

  # Test fix for bug HTBHF-854
  @RequiresWiremock
  Scenario: The overview page allows a claimant to start a new application
    Given I have completed my application
    When I navigate to the Apply for Healthy Start overview page
    And I select to start the process
    Then I am shown the first page of the application

  # Make sure the start page button takes you to Do You Live In Scotland, not Enter Name, which can best be tested by
  # going through a process and returning (otherwise state machine always returns you to nextAllowedStep)
  Scenario: The overview page takes the claimant to the first page of the application when details have been entered
    Given I have entered my details up to the email address page
    When I navigate to the Apply for Healthy Start overview page
    And I select to start the process
    Then I am shown the first page of the application
