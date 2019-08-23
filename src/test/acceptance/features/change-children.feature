Feature: Change answer for 'Do you have children under four years old?'
  In order to apply for the Apply for Healthy Start programme
  As a potential claimant
  I want to change my answer to 'Do you have children under four years old?'

  Background:
    Given I am on the check answers page having entered valid details for a pregnant woman

  Scenario: I can change my answer to yes for 'Do you have children under four years old?' from the check answers page
    When I choose to change my answer to Do you have children
    And I say Yes to the do you have children under four years old question
    And I click continue
    Then I am shown the enter your childrens dates of birth page

  Scenario: I can change my answer to no for 'Do you have children under four years old?' from the check answers page
    When I choose to change my answer to Do you have children
    And I say No to the do you have children under four years old question
    And I click continue
    Then I am shown the check answers page
    And there are no children displayed
