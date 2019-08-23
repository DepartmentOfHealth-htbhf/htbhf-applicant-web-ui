Feature: Application process navigation is controlled
  In order to help me complete the application correctly
  As a potential claimant
  I want to make sure that only the correct application flow can be used

  Scenario Outline: Do you live in Scotland page is always the first page
    Given I am starting a new application
    When I navigate to the <page> page
    Then I am shown the do you live in Scotland page
    Examples:
      | page                                  |
      | enter name                            |
      | enter national insurance number       |
      | enter date of birth                   |

  @RequiresWiremock
  Scenario: Navigation to confirm page after completing application stays on the confirm page
    Given I have completed my application
    When I navigate to the confirmation page
    Then I am shown the confirm details page

  @RequiresWiremock
  Scenario Outline: Navigation after completing application returns to start of process and clears the session
    Given I have completed my application
    When I navigate to the <page> page
    Then I am shown the guidance page
    Examples:
      | page                                  |
      | enter name                            |
      | do you live in Scotland               |
      | I live in Scotland                    |

  Scenario Outline: Navigation is not allowed past the current page in the flow
    Given I have entered my details up to the <application page> page
    When I navigate to the <navigation page> page
    Then I am shown the <application page> page
    Examples:
      | application page    | navigation page |
      | enter name          | address         |
      | enter date of birth | check answers   |
      | are you pregnant    | confirmation    |

  Scenario Outline: Navigation to previous navigable steps in an unsubmitted application flow is allowed
    Given I have entered my details up to the check answers page
    When I navigate to the <page> page
    Then I am shown the <page> page
    Examples:
      | page                                  |
      | enter name                            |
      | enter national insurance number       |
      | enter date of birth                   |

  Scenario: Navigation to I live in Scotland from the check answers page is not allowed
    Given I have entered my details up to the check answers page
    When I navigate to the I live in Scotland page
    Then I am shown the terms and conditions page

  Scenario: Navigation to send code is not allowed after the confirmation code has been sent
    Given I have entered my details up to the check answers page
    When I go directly to the send code page
    Then I am shown the terms and conditions page

  Scenario: Navigation to enter code is not allowed after the confirmation code has been sent
    Given I have entered my details up to the check answers page
    When I go directly to the enter code page
    Then I am shown the terms and conditions page
