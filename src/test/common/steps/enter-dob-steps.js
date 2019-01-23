const { Given, When, Then } = require('cucumber')
const { assert } = require('chai')

const pages = require('./pages')

Given(/^I am on the enter date of birth page$/, async function () {
  await pages.enterDOB.open(pages.url)
})

When(/^I enter my date of birth as (.*), (.*) and (.*)$/, async function (day, month, year) {
  return enterDateOfBirth(day, month, year)
})

Then(/^the check your details page is shown$/, async function () {
  await pages.check.waitForPageLoad()
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
