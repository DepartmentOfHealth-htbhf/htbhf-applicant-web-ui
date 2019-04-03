Feature: Temporary overview page
  In order to facilitate the beta HTBHF programme
  As a potential claimant
  I want to see the temporary overview page before I start the application process

  Scenario: The overview page is available and starts the application process
    Given I navigate to the HTBHF overview page
    When I select to start the process
    Then I am shown the enter name page

  # Test fix for bug HTBHF-854
  Scenario: The overview page allows a claimant to start a new application
    Given I have completed my application
    When I navigate to the HTBHF overview page
    And I select to start the process
    Then I am shown the enter name page
