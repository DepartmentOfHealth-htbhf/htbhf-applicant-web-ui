Feature:
  In order to apply for the HTBHF programme
  As a potential claimant
  I want to select whether or not I am pregnant

  Background:
    Given I am on the are you pregnant page

  Scenario: No option is select
    Then No option is selected

  Scenario: Yes and No are displayed
    Then Yes and No options are displayed

  Scenario Outline: Select that an option
    When I select the <option> option
    Then I am shown the card address page

    Examples:
    | option |
    | yes    |
    | no     |

  Scenario: Do not select an option
    When I do not select an option
    Then I am informed that I need to select an option
