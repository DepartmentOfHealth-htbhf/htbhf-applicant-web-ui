const { Given, When, Then } = require('cucumber')
const { expect, assert } = require('chai')

const pages = require('./pages')

Given(/^I am on the enter date of birth page$/, async function () {
  await pages.enterDOB.open(pages.url)
})

When(/^I enter my date of birth as day: (.*), month: (.*) and year: (.*)$/, async function (day, month, year) {
  return enterDateOfBirth(day, month, year)
})

Then(/^the check your details page is shown$/, async function () {
  await pages.check.waitForPageLoad()
})

Then(/^I am informed that a valid date of birth is required$/, async function () {
  await assertErrorHeaderTextPresent()
  await assertDateOfBirthErrorPresent('Enter your date of birth')
})

Then(/^I am informed that my date of birth should be in the past$/, async function () {
  await assertErrorHeaderTextPresent()
  await assertDateOfBirthErrorPresent('Date of birth must be in the past')
})

async function enterDateOfBirth (day, month, year) {
  try {
    await pages.enterDOB.enterDay(day)
    await pages.enterDOB.enterMonth(month)
    await pages.enterDOB.enterYear(year)
    await pages.enterDOB.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter the date of birth and submit the page - ${error}`)
  }
}

async function assertErrorHeaderTextPresent () {
  try {
    await pages.enterDOB.waitForPageLoad()
    const errorHeader = await pages.enterDOB.getPageErrorHeaderText()
    expect(errorHeader).to.equal('There is a problem')
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert error header text is present - ${error}`)
  }
}

async function assertDateOfBirthErrorPresent (expectedErrorMessage) {
  try {
    const error = await pages.enterDOB.getDateOfBirthError()
    expect(error).to.be.equal(expectedErrorMessage)
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert date of birth error message is present - ${error}`)
  }
}
