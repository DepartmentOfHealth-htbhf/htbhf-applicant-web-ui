const { When, Then } = require('cucumber')
const { expect, assert } = require('chai')

const pages = require('./pages')
const { enterDateOfBirthAndSubmit, assertErrorHeaderTextPresent } = require('./common-steps')

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
  try {
    const fieldError = await pages.enterDOB.getDateOfBirthFieldErrorText()
    const errorLink = await pages.enterDOB.getDateOfBirthErrorLinkText()

    expect(fieldError).to.be.equal(expectedErrorMessage)
    expect(errorLink).to.be.equal(expectedErrorMessage)
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert date of birth error message is present - ${error}`)
  }
}
