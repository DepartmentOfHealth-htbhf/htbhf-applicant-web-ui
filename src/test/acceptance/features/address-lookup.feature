Feature: Select address
  In order to apply for the Apply for Healthy Start programme
  As a potential claimant
  I want to lookup my address

  Background:
    Given I have entered my details up to the postcode page

    # TODO DW HTBHF-2037 include test once address lookup is enabled
    @ignore
    Scenario: Entering a postcode with no search results shows that no addresses were found
      When I enter a postcode with no search results
      Then I am shown the select address page
      And I am informed that no addresses were found for my postcode
      And I am shown a button to enter my address manually
