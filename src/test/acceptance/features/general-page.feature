Feature: Tests for features available to all pages
  In order to facilitate the beta Apply for Healthy Start programme
  As a potential claimant
  I want to see the features that I need on every page

  Background:
    Given I have entered my details up to the do you live in Scotland page

  Scenario: The Privacy notice page is accessible via a link on an application page and the back link is shown
    When I click on the privacy-notice link
    Then the privacy-notice page is shown
    And the back link on the page links to the do you live in Scotland page

  Scenario: The Cookies page is accessible via a link on an application page and the back link is shown
    When I click on the cookies link
    Then the cookies page is shown
    And the back link on the page links to the do you live in Scotland page

  Scenario: The Beta banner is shown and has the correct survey link
    Then the beta banner is shown
    And the beta banner has the correct survey link
