Feature: Cookies page
  In order to facilitate the beta Apply for Healthy Start programme
  As a potential claimant
  I want to see the details of how cookies are use during the application process

  Scenario: The Cookies page is accessible via a link on an application page and the back link is shown
    Given I have entered my details up to the enter name page
    When I click on the cookies link
    Then the cookies page is shown
    And the back link on the cookies page links to the enter name page

  Scenario: The back link on the Cookies page is not shown if we navigate to it directly
    When I navigate to the cookies page
    Then the cookies page is shown
    And no back link is shown
