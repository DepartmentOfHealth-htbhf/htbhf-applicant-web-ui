Feature: Confirmation code navigation
  In order to apply for the Apply for Healthy Start programme
  As a potential claimant
  Once I have entered my confirmation code
  If I change the contact details used to receive that code
  I have to re-validate those contact details.

  Background:
    Given I am on the first page of the application

  Scenario: Changing my phone number after using it to receive a code requires me to be sent a new code
    When I complete the application with valid details, selecting to receive my confirmation code via text
    And I choose to change my phone number
    And I enter in a new phone number
    Then I must complete all steps after the phone number page, including entering a new code

  Scenario: Changing my email address after using it to receive a code requires me to be sent a new code
    When I complete the application with valid details, selecting to receive my confirmation code via email
    And I choose to change my email address
    And I enter in a new email address
    Then I must complete all steps after the email address page, including entering a new code
