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

  Scenario: Do not select an option
    When I do not select an option
    Then I am informed that I need to select an option

  Scenario: Select the no option
    When I select the no option
    Then I am shown the card address page

  Scenario: Select the yes option and expected date of delivery appears
    When I select the yes option
    And expected date of delivery instructional text is displayed
    Then I enter a valid expected delivery date
    And I am shown the card address page

  Scenario: Select the yes option and do not enter a date
    When I select the yes option
    And I click continue
    Then I am informed that I need to enter an expected delivery date

  Scenario: Select the yes option and enter text for the delivery date
    When I select the yes option
    And I enter text in the expected delivery date fields
    Then no values are present in the expected delivery date fields

  Scenario: Select the yes option and enter a date too far in the past
    When I select the yes option
    And I enter my expected delivery date too far in the past
    Then I am informed that the date is too far in the past

  Scenario: Select the yes option and enter a date too far in the future
    When I select the yes option
    And I enter my expected delivery date too far in the future
    Then I am informed that the date is too far in the future
