const { When } = require('cucumber')
const { assert } = require('chai')

const pages = require('./pages')

const VALID_NINO = 'QQ123456C'

When(/^I enter a valid set of details$/, async function () {
  await enterNameAndSubmit('Lisa', 'Simpson')
  await enterNinoAndSubmit(VALID_NINO)
  await enterDateOfBirth('30', '12', '1980')
})

// TODO - Need to refactor these into a common file to remove duplication with other step files.
async function enterNameAndSubmit (firstName, lastName) {
  try {
    await pages.enterName.enterFirstName(firstName)
    await pages.enterName.enterLastName(lastName)
    await pages.enterName.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter the name and submit the page - ${error}`)
  }
}

async function enterNinoAndSubmit (nino) {
  try {
    await pages.enterNino.enterNino(nino)
    await pages.enterNino.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter the national insurance number and submit the page - ${error}`)
  }
}

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
