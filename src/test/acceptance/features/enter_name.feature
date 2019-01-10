Feature:
  In order apply for HTBHF programme
  As a potential claimant
  I want to enter my name

  Scenario: Fill “Firstname” textbox with text which exceeds maximum length
    Given I navigate to the HTBHF website and start the application process
    When I enter a first name which is too long
    Then I am informed that the first name is too long

