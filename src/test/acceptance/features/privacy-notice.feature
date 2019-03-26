Feature: Privacy notice page
  In order to facilitate the beta HTBHF programme
  As a potential claimant
  I want to see the details of how my details are used and retained

  Scenario: The Privacy notice page is accessible
    Given I navigate to the HTBHF overview page
    When I click on the privacy-notice link
    Then the privacy-notice page is shown
    And all page content is present on the privacy-notice page

  Scenario: The back link on the Privacy notice page is not shown if we navigate to it directly
    When I navigate to the privacy-notice page
    Then the privacy-notice page is shown
    And no back link is shown

  Scenario: The back link on the Privacy notice page is shown when the page is accessed via a link on an application page
    Given I have entered my details up to the enter name page
    When I click on the privacy-notice link
    Then the privacy-notice page is shown
    And the back link on the privacy-notice page links to the enter name page
