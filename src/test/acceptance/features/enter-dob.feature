Feature:
  In order apply for HTBHF programme
  As a potential claimant
  I want to enter my date of birth

  Background:
    Given I am on the enter date of birth page

  Scenario Outline: Enter in a valid date of birth
    When I enter my date of birth as <day>, <month> and <year>
    Then the check your details page is shown

    Examples:
      | day | month | year |
      | 30  | 12    | 1980 |
      | 29  | 02    | 2000 |
      | 1   | 1     | 1985 |
      | 03  | 09    | 1999 |
