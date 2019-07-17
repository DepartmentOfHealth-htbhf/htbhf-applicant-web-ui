Feature: Are you pregnant?
  In order to apply for the Apply for Healthy Start programme
  As a potential claimant
  I want to select whether or not I am pregnant

  Background:
    Given I have entered my details up to the are you pregnant page

  Scenario: No option is selected
    Then No option is selected

  Scenario: Yes and No are displayed
    Then Yes and No options are displayed on the are you pregnant page

  Scenario: Do not select an option
    When I do not select an option
    And I click continue
    Then I am informed that I need to select an option for are you pregnant

  Scenario: Select the No option
    When I say No to the are you pregnant question
    And I click continue
    Then I am shown the enter name page

  Scenario: Select Yes and the expected date of delivery instructional text is shown
    When I say Yes to the are you pregnant question
    Then expected date of delivery instructional text is displayed

  Scenario: Select the Yes option and enter valid expected delivery date
    When I say Yes to the are you pregnant question
    And I enter a valid expected delivery date
    And I click continue
    Then I am shown the enter name page

  Scenario: Select the Yes option and do not enter a date
    When I say Yes to the are you pregnant question
    And I click continue
    Then I am informed that I need to enter an expected delivery date

  Scenario: Select the Yes option and enter text for the delivery date
    When I say Yes to the are you pregnant question
    And I enter text in the expected delivery date fields
    Then no values are present in the expected delivery date fields

  Scenario: Select the Yes option and enter a date too far in the past
    When I say Yes to the are you pregnant question
    And I enter my expected delivery date too far in the past
    And I click continue
    Then I am informed that the date is too far in the past

  Scenario: Select the Yes option and enter a date too far in the future
    When I say Yes to the are you pregnant question
    And I enter my expected delivery date too far in the future
    And I click continue
    Then I am informed that the date is too far in the future
