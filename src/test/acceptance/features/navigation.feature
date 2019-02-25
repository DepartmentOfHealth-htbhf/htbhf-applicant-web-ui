Feature: Application process navigation is controlled
  In order to facilitate the beta HTBHF programme
  As a potential claimant
  I want to make sure that only the correct application flow can be used

  Scenario Outline: Enter name page is always the first page
    Given I am starting a new application
    When I navigate to the <page> page
    Then I am shown the enter name page
    Examples:
      | page                     |
      | enter name               |
      | enter national insurance |
      | enter date of birth      |
      | are you pregnant         |
      | card address             |

  Scenario Outline: Navigation after completing application returns to confirm page
    Given I have completed my application
    When I navigate to the <page> page
    Then I am shown a successful confirmation page
    Examples:
      | page                     |
      | enter name               |
      | enter national insurance |
      | enter date of birth      |
      | are you pregnant         |
      | card address             |

  Scenario Outline: Navigation is not allowed past the current page in the flow
    Given I have entered my details up to the <page> page
    When I navigate to the check details page
    Then I am shown the <page> page
    Examples:
      | page                     |
      | enter name               |
      | enter national insurance |
      | enter date of birth      |
      | are you pregnant         |
      | card address             |

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
