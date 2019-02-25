Feature: Application process navigation is controlled
  In order to facilitate the beta HTBHF programme
  As a potential claimant
  I want to make sure that only the correct application flow can be used

  Scenario Outline: Enter name page is always the first page
    Given I am starting a new application
    When I navigate to the <page> page
    Then I am shown the enter name page
    Examples:
      | page             |
      | Enter Name       |
      | Enter Nino       |
      | Enter DOB        |
      | Are You Pregnant |
      | Card Address     |
