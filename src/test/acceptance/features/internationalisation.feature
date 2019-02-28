Feature: Translations
  In order to apply for the HTBHF programme
  As a potential claimant
  I want to view the site in my preferred language

  Scenario:
    When I have entered my details up to the enter national insurance page with Welsh language selected
    Then the enter national insurance page is in Welsh

  Scenario:
    Given I have entered my details up to the enter national insurance page with Welsh language selected
    When I enter a valid national insurance number
    Then I am on the next page which is displayed in Welsh
