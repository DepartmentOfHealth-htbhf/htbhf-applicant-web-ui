Feature: Change answer for Do you have children?
  In order to apply for the Apply for Healthy Start programme
  As a potential claimant
  I want to change my answer to Do you have children?

  Background:
    Given I am on the check details page having entered valid details for a pregnant woman

  Scenario: I can change my answer to yes for 'Do you have children?' from the check details page
    When I choose to change my answer to Do you have children
    And I say Yes to the do you have children three or younger question
    And I click continue
    Then I am shown the enter your childrens dates of birth page

  @ignore
  Scenario: I can change my answer to no for 'Do you have children?' from the check details page
    When I choose to change my answer to Do you have children
    And I say No to the do you have children three or younger question
    And I click continue
    Then I am shown the check details page
    And there are no children displayed
