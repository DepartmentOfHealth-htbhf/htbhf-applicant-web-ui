const { expect, assert } = require('chai')

const pages = require('./pages')

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

async function selectYesOnPregnancyPage () {
  try {
    await pages.areYouPregnant.selectRadioButton('yes')
    await pages.areYouPregnant.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to select 'Yes' for 'Are you pregnant?' and submit the page - ${error}`)
  }
}

async function assertErrorHeaderTextPresent (page) {
  try {
    await page.waitForPageLoad()
    const errorHeader = await page.getPageErrorHeaderText()
    expect(errorHeader).to.equal('There is a problem')
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert error header text is present - ${error}`)
  }
}

module.exports = {
  enterDateOfBirth,
  enterNameAndSubmit,
  enterNinoAndSubmit,
  selectYesOnPregnancyPage,
  assertErrorHeaderTextPresent
}
