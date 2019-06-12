Feature: Enter phone number
  In order to apply for the HTBHF programme
  As a potential claimant
  I want to enter my phone number

  Background:
    Given I have entered my details up to the phone number page

  Scenario Outline: Enter in a valid phone number
    When I enter <phoneNumber> as my phone number
    Then I am shown the check details page

    Examples:
      | phoneNumber   |
      | 07123456789   |
      | +447123456789 |
      | 07123 456789  |

  Scenario: Do not enter in a "phone number"
    When I do not enter a phone number
    Then I am informed that the phone number is required

  Scenario Outline: Fill "phone number" with invalid format
    When I enter <phoneNumber> as my phone number
    Then I am informed that the phone number is in the wrong format
    Then I see the value <phoneNumber> in the phone number textbox

    Examples:
      | phoneNumber       |
      | ab123456Q         |
      | 07123456          |
      | 07123456789123456 |
      | +0017123456789    |
