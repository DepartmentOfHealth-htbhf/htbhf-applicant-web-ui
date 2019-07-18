Feature: Enter email address
  In order to apply for the Apply for Healthy Start programme
  As a potential claimant
  I want to enter my email address

  Background:
    Given I have entered my details up to the email address page

  Scenario: Enter a valid email address
    When I enter a valid email address
    Then I am shown the send code page

  Scenario: Do not enter an email address
    When I do not enter an email address
    Then I am informed that I must enter in a valid email address

  Scenario: Enter an email that is too long
    When I enter an email address that is too long
    Then I am informed that I must enter in a valid email address

  Scenario Outline: Enter an email address with invalid format
    When I enter <invalidEmailAddress> as my email address
    Then I am informed that I must enter in a valid email address
    Then I see the email address <invalidEmailAddress> in the textbox

    Examples:
      | invalidEmailAddress |
      | plainaddress        |
      | #@%^%#$@#$@#.com    |
      | @domain.com         |
