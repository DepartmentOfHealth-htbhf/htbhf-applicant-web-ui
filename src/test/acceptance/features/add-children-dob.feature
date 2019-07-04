Feature: Add children's date of birth
  In order to apply for the HTBHF programme
  As a potential claimant
  I want to enter the dates of birth of my children who are 3 years old or younger

  Background:
    Given I have entered my details up to the add your childrens dates of birth page

  Scenario: Enter one child's details
    When I enter the details of my child who is under 3
    And I click continue
    Then I am shown the are you pregnant page

  Scenario: Enter two children's details
    When I enter the details of my two children who are under 3
    And I click continue
    Then I am shown the are you pregnant page

  Scenario: Enter one child's details without a name, name is optional
    When I enter the details of my child who is under 3 without a name
    And I click continue
    Then I am shown the are you pregnant page
