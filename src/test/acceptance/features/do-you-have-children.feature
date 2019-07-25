Feature: Do you have children under four years old?
  In order to apply for the Apply for Healthy Start programme
  As a potential claimant
  I want to select whether or not I have children who are 3 years old or younger

  Background:
    Given I have entered my details up to the do you have children under four years old page

  Scenario: Yes and No are displayed
    Then Yes and No options are displayed on the do you have children under four years old page

  Scenario: Do not select an option on the do you have children under four years old page
    When I do not select an option
    And I click continue
    Then I am informed that I need to select an option for do you have children under four years old

  Scenario: Select the No option on the do you have children under four years old page
    When I say No to the do you have children under four years old question
    And I click continue
    Then I am shown the are you pregnant page

  Scenario: Select the Yes option and I am asked to enter my children's dates of birth
    When I say Yes to the do you have children under four years old question
    And I click continue
    Then I am shown the enter your childrens dates of birth page

  Scenario: Children’s dates of birth is not navigable via the back button if I’ve said I have no children
    When I have said No to the do you have children under four years old question
    And I am shown the are you pregnant page
    Then The back link points to the Do you have children under four years old page
