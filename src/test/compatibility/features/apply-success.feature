Feature:
  In order to apply for the HTBHF programme
  As a potential claimant
  I want to enter my name

  Scenario: Valid first name and last name form submission
    Given I am on the enter name page
    When I enter a valid set of details
    Then the check your details page is shown
