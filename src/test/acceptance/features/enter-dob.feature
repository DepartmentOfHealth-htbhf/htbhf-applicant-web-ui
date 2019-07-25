Feature: Date of birth
  In order to apply for the Apply for Healthy Start programme
  As a potential claimant
  I want to enter my date of birth

  Background:
    Given I have entered my details up to the enter date of birth page

  Scenario: Enter a date of birth in the future
    When I enter my date of birth as day: 03, month: 09 and year: 9999
    Then I am informed that my date of birth should be in the past

  Scenario Outline: Enter an invalid date of birth
    When I enter my date of birth as day: <day>, month: <month> and year: <year>
    Then I am informed that a valid date of birth is required
    Examples:
      | day | month | year |
      |     |       |      |
      | 30  | 02    | 2000 |
      | 40  | 1     | 1985 |
      | 03  | 37    | 1978 |

  Scenario Outline: Enter a valid date of birth
    When I enter my date of birth as day: <day>, month: <month> and year: <year>
    Then I am shown the do you have children under four years old page
    Examples:
      | day | month | year |
      | 30  | 12    | 1980 |
      | 29  | 02    | 2000 |
      | 1   | 1     | 1985 |
