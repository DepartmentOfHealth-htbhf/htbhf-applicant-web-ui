Feature:
  In order apply for HTBHF programme
  As a potential claimant
  I want to enter my name

  Background:
    Given I am on the enter name page

  Scenario: Fill “First name” textbox with text which exceeds maximum length
    When I enter a first name which is too long
    Then I am informed that the first name is too long
    Then I see the invalid first name I entered in the textbox

  Scenario: Fill “Last name” textbox with text which exceeds maximum length
    When I enter a last name which is too long
    Then I am informed that the last name is too long
    Then I see the last name I entered in the textbox

  Scenario: Fail to fill “Last name” textbox shows error
    When I enter first name only
    Then I am informed that a last name is required

  Scenario Outline: Valid first name and last name form submission
    When I enter <firstName> and <lastName> values
    Then I am shown the date of birth page

  Examples:
  | firstName                                                 | lastName                    |
  | <script>window.location.href=“www.google.com”</script>    | ‘;exec xp_cmdshell ‘dir’;–  |
  | Henrietta                                                 | Fulsome-Blues               |
  | Henrietta                                                 | Młynarczyk                  |
  | Maria                                                     | Nowak                       |
