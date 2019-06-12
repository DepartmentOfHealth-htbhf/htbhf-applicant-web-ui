Feature: Translations
  In order to apply for the HTBHF programme
  As a potential claimant
  I want to view the site in my preferred language

  Scenario:
    When I have completed the first step of the application with Welsh language selected
    Then the next page is displayed in Welsh

  Scenario:
    Given I have completed the first step of the application with Welsh language selected
    When I successfully complete the next step
    Then the next page continues to be displayed in Welsh
