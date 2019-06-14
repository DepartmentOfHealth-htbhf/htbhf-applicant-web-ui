const { When, Then } = require('cucumber')

const pages = require('./pages')
const { enterDateOfBirthAndSubmit, assertErrorHeaderTextPresent, assertFieldErrorAndLinkTextPresentAndCorrect } = require('./common-steps')

When(/^I enter my date of birth as day: (.*), month: (.*) and year: (.*)$/, async function (day, month, year) {
  return enterDateOfBirthAndSubmit(day, month, year)
})

Then(/^I am shown the enter date of birth page$/, async function () {
  await pages.enterDOB.waitForPageLoad()
})

Then(/^I am informed that a valid date of birth is required$/, async function () {
  await assertErrorHeaderTextPresent(pages.enterDOB)
  await assertDateOfBirthErrorPresent('Enter your date of birth')
})

Then(/^I am informed that my date of birth should be in the past$/, async function () {
  await assertErrorHeaderTextPresent(pages.enterDOB)
  await assertDateOfBirthErrorPresent('Date of birth must be in the past')
})

async function assertDateOfBirthErrorPresent (expectedErrorMessage) {
  await assertFieldErrorAndLinkTextPresentAndCorrect(
    pages.enterDOB.getDateOfBirthFieldErrorId(),
    pages.enterDOB.getDateOfBirthErrorLinkCss(),
    expectedErrorMessage)
}
