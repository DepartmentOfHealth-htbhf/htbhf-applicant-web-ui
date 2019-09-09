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
    When I enter a postcode that returns search results
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
  Scenario: Changing details for a selected address takes me to the select address page
    Given I have entered my details up to the check answers page and selected an address
    When I choose to change my address
    Then I am shown the select address page

  # TODO DW HTBHF-2037 include test once address lookup is enabled
  @ignore
  Scenario: Entering a new postcode when I have selected to change my address takes me to the select address page
    Given I have entered my details up to the check answers page and selected an address
    When I choose to change my address
    And I click the change postcode link
    And I enter a postcode that returns search results
    Then I am shown the select address page

  # TODO DW HTBHF-2037 include test once address lookup is enabled
  @ignore
  Scenario: Clicking the address not listed link when I have selected to change my answer for select address takes me to the manual address page
    Given I have entered my details up to the check answers page and selected an address
    When I choose to change my address
    And I click the address not listed link
    Then I am shown the manual address page

  # TODO DW HTBHF-2037 include test once address lookup is enabled
  @ignore
  Scenario Outline: Enter an invalid postcode on the postcode lookup page
    Given I have entered my details up to the postcode page
    When I enter <postcode> as my postcode
    Then I am informed that the postcode is in the wrong format

    Examples:
      | postcode |
      | AA1122BB |
      | A        |
      | 11AA21   |

  # TODO DW HTBHF-2037 include test once address lookup is enabled
#  @ignore
  Scenario: I am shown an error response when a bad respoonse is returned from os places and I can then enter my address manually
    Given I have entered my details up to the postcode page
    And OS places returns an error response
    When I enter my postcode
    Then I am shown the select address page
    And I am informed that there's a problem with the postcode finder
    And I am shown a link to change my postcode
    And I am shown a button to enter my address manually

  # TODO DW HTBHF-2037 include test once address lookup is enabled
#  @ignore
  Scenario: I am shown an error response when there are connection issues with os places and I can then enter my address manually
    Given I have entered my details up to the postcode page
    And OS places resets the connection
    When I enter my postcode
    Then I am shown the select address page
    And I am informed that there's a problem with the postcode finder
    And I am shown a link to change my postcode
    And I am shown a button to enter my address manually
