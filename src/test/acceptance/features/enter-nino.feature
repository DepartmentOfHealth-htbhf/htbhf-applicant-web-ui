Feature: Enter National Insurance number
  In order to apply for the Apply for Healthy Start programme
  As a potential claimant
  I want to enter my national insurance number

  Background:
    Given I have entered my details up to the enter national insurance number page

  Scenario: Enter in a valid national insurance number
    When I enter a valid national insurance number
    Then I am shown the manual-address page

  Scenario: Do not enter in a "national insurance number"
    When I do not enter a national insurance number
    Then I am informed that the national insurance number is in the wrong format

  Scenario Outline: Fill "national insurance number" with invalid format
    When I enter <invalidNino> as my national insurance number
    Then I am informed that the national insurance number is in the wrong format
    Then I see the value <invalidNino> in the textbox

    Examples:
      | invalidNino        |
      | ab123456Q          |
      | QQ123456CQQ123456C |
      | QQ123456CQtest     |
