Feature: Select address
  In order to apply for the Apply for Healthy Start programme
  As a potential claimant
  I want to lookup my address

  # TODO DW HTBHF-2037 include test once address lookup is enabled
  @ignore
  Scenario: Entering a postcode with no search results shows that no addresses were found
    Given I have entered my details up to the postcode page
    When I enter a postcode that returns no search results
    Then I am shown the select address page
    And I am informed that no addresses were found for my postcode
    And I am shown a link to change my postcode
    And I am shown a button to enter my address manually

  # TODO DW HTBHF-2037 include test once address lookup is enabled
  @ignore
  Scenario: Entering a postcode shows a list of matching addresses
    Given I have entered my details up to the postcode page
    When I enter a postcode
    Then I am shown the select address page
    And I am shown a list of addresses
    And I am shown an address not listed link
    And I am shown a continue button

  # TODO DW HTBHF-2037 include test once address lookup is enabled
  @ignore
  Scenario: Selecting an address skips the manual address page
    Given I have entered my details up to the select address page
    When I select an address
    And I click continue
    Then I am shown the phone number page

  # TODO DW HTBHF-2037 include test once address lookup is enabled
  @ignore
  Scenario: Clicking the address not listed link shows the manual address page
    Given I have entered my details up to the select address page
    When I click the address not listed link
    Then I am shown the manual address page

  # TODO DW HTBHF-2037 include test once address lookup is enabled
  @ignore
  Scenario: Changing details for a selected address takes me to the postcode page
    Given I have entered my details up to the check details page and selected an address
    When I choose to change my address
    Then I am shown the postcode page
