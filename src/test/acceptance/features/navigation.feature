Feature: Application process navigation is controlled
  In order to help me complete the application correctly
  As a potential claimant
  I want to make sure that only the correct application flow can be used

  Scenario Outline: Enter date of birth page is always the first page
    Given I am starting a new application
    When I navigate to the <page> page
    Then I am shown the enter date of birth page
    Examples:
      | page                     |
      | enter name               |
      | enter national insurance |
      | enter date of birth      |
      | are you pregnant         |
      | card address             |
      | check details            |
      | confirmation             |

  @RequiresWiremock
  Scenario: Navigation to confirm page after completing application stays on the confirm page
    Given I have completed my application
    When I navigate to the confirmation page
    Then I am shown the confirm details page

  @RequiresWiremock
  Scenario Outline: Navigation after completing application returns to start of process and clears the session
    Given I have completed my application
    When I navigate to the <page> page
    Then I am shown the overview page
    Examples:
      | page                     |
      | enter name               |
      | enter national insurance |
      | enter date of birth      |
      | are you pregnant         |
      | card address             |

  Scenario Outline: Navigation is not allowed past the current page in the flow
    Given I have entered my details up to the <application page> page
    When I navigate to the <navigation page> page
    Then I am shown the <application page> page
    Examples:
      | application page    | navigation page |
      | enter name          | card address    |
      | enter date of birth | check details   |
      | are you pregnant    | confirmation    |


  Scenario Outline: Navigation to previous steps in an unsubmitted application flow is allowed
    Given I have entered my details up to the check details page
    When I navigate to the <page> page
    Then I am shown the <page> page
    Examples:
      | page                     |
      | enter name               |
      | enter national insurance |
      | enter date of birth      |
      | are you pregnant         |
      | card address             |
