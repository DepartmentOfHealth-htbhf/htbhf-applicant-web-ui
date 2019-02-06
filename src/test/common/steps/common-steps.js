const { expect, assert } = require('chai')
const { When } = require('cucumber')

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
    await pages.areYouPregnant.enterValidExpectedDeliveryDate()
    await pages.areYouPregnant.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to select 'Yes' for 'Are you pregnant?' and submit the page - ${error}`)
  }
}

async function selectNoOnPregnancyPage () {
  try {
    await pages.areYouPregnant.selectRadioButton('no')
    await pages.areYouPregnant.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to select 'No' for 'Are you pregnant?' and submit the page - ${error}`)
  }
}

async function enterCardAddress (addressLine1, addressLine2, townOrCity, postcode) {
  try {
    await pages.cardAddress.enterAddressLine1(addressLine1)
    await pages.cardAddress.enterAddressLine2(addressLine2)
    await pages.cardAddress.enterTownOrCity(townOrCity)
    await pages.cardAddress.enterPostcode(postcode)
    await pages.cardAddress.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter card address and submit the page - ${error}`)
  }
}

async function assertErrorHeaderTextPresent (page, message = 'There is a problem') {
  try {
    await page.waitForPageLoad()
    const errorHeader = await page.getPageErrorHeaderText()
    expect(errorHeader).to.equal(message)
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert error header text is present - ${error}`)
  }
}

When(/^I click continue$/, async function () {
  await pages.genericPage.submitForm()
})

module.exports = {
  enterDateOfBirth,
  enterNameAndSubmit,
  enterNinoAndSubmit,
  selectYesOnPregnancyPage,
  selectNoOnPregnancyPage,
  enterCardAddress,
  assertErrorHeaderTextPresent
}
