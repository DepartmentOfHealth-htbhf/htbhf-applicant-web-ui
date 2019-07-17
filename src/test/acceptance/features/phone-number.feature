Feature: Enter phone number
  In order to apply for the Apply for Healthy Start programme
  As a potential claimant
  I want to enter my phone number

  Background:
    Given I have entered my details up to the phone number page

  Scenario Outline: Enter in a valid phone number
    When I enter <phoneNumber> as my phone number
    Then I am shown the email address page

    Examples:
      | phoneNumber   |
      | 07123456789   |
      | +447123456789 |
      | 07123 456789  |

  Scenario: Do not enter in a phone number
    When I do not enter a phone number
    Then I am informed that I must enter in a valid phone number

  Scenario Outline: Fill phone number with invalid format
    When I enter <phoneNumber> as my phone number
    Then I am informed that I must enter in a valid phone number
    Then I see the value <phoneNumber> in the phone number textbox

    Examples:
      | phoneNumber       |
      | ab123456Q         |
      | 07123456          |
      | 07123456789123456 |
