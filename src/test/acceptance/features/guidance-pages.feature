Feature: Guidance pages
  Before applying for the  Apply for Healthy Start programme
  As a potential claimant
  I want to see the guidance pages before I start the application process

  Scenario Outline: The guidance pages are present and navigable
    Given I open the <page> guidance page
    Then all the <page> guidance page content is present
    Examples:
      | page                    |
      | How it works            |
      | Eligibility             |
      | What you’ll get         |
      | What you can buy        |
      | Using your card         |
      | Apply for Healthy Start |
      | Report a change         |
