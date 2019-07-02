Feature: Add your children’s dates of birth
  In order to apply for the HTBHF programme
  As a potential claimant
  I want to provide my children’s dates of birth

  Background:
    Given I have entered my details up to the do you have children three or younger page

  # TODO HTBHF-1588 implement this scenario once the childrens-dob steps are in place
  @ignore
  Scenario: Children’s dates of birth is not navigable via the back button if I’ve said I have no children
    Given I have said No to the do you have children three or younger question
    When I am shown the are you pregnant page
    Then The back link points to the Do you have any children who are three years old or younger page


  # TODO HTBHF-1588 implement this scenario once the childrens-dob steps are in place
  @ignore
  Scenario: Children’s dates of birth is navigable via the back button if I’ve said I have children
    Given I have said Yes to the do you have children three or younger question
    And I have entered my children’s dates of birth
    When I am shown the are you pregnant page
    Then The back link points to the Add your children’s dates of birth page
