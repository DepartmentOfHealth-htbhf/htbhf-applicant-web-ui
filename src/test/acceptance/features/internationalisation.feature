Feature:
  In order apply for HTBHF programme
  As a potential claimant
  I want to view the site in my preferred language

  Scenario:
    When I go to the enter national insurance number page with Welsh language selected
    Then the enter national insurance page is in Welsh

  Scenario:
    Given I am on the enter national insurance number page with Welsh language selected
    When I enter a valid national insurance number
    Then I am on the next page which is displayed in Welsh
