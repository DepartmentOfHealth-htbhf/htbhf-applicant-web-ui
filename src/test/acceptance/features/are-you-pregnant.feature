Feature:
  In order to apply for the HTBHF programme
  As a potential claimant
  I want to select whether or not I am pregnant

  Background:
    Given I am on the are you pregnant page

  Scenario: No option is selected
    Then No option is selected

  Scenario: Yes and No are displayed
    Then Yes and No options are displayed

  Scenario: Select the no option
    When I select the no option
    Then I am shown the card address page

  Scenario: Select the yes option and enter a valid expected due date
    When I select the yes option
    And I enter my expected due date in six months time
    Then I am shown the card address page

  Scenario: Do not select an option
    When I do not select an option
    Then I am informed that I need to select an option
