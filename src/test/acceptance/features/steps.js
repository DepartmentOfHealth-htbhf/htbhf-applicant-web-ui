const { Given, When, Then } = require('cucumber')
const { expect, assert } = require('chai')

const globals = require('./globals')
const { BASE_URL } = require('../constants')

const LONG_NAME = 'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' + // 100
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' + // 200
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' + // 300
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' + // 400
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' + // 500
  'This name is way too long'

const BLANK_NAME = ''

Given('I navigate to the HTBHF overview page', async function () {
  await globals.overview.open(BASE_URL)

  const h1ElementText = await globals.overview.getH1Text()
  expect(h1ElementText).to.be.equal('Overview')
})

When('I select to start the process', async function () {
  await globals.overview.clickStartButton()
})

Then('the enter name page is shown', async function () {
  await globals.enterName.waitForPageLoad()
})

Given('I start the application process', async function () {
  await globals.enterName.open(BASE_URL)
  await globals.enterName.waitForPageLoad()
})

When('I enter a first name which is too long', async function () {
  return enterNameAndSubmit(LONG_NAME, 'Bloggs')
})

When('I enter a last name which is too long', async function () {
  return enterNameAndSubmit('Joe', LONG_NAME)
})

When('I enter first name only', async function () {
  return enterNameAndSubmit('Joe', BLANK_NAME)
})

When(/^I enter (.*) and (.*) values$/, async function (firstName, lastName) {
  return enterNameAndSubmit(firstName, lastName)
})

Then('I am informed that the first name is too long', async function () {
  await assertErrorHeaderTextPresent()
  const errorMessage = await globals.enterName.getFirstNameError()
  expect(errorMessage).to.be.equal('Enter a shorter first or given name')
})

Then('I am informed that the last name is too long', async function () {
  await assertErrorHeaderTextPresent()
  await assertLastNameErrorPresent('Enter a shorter last or family name')
})

Then('I am informed that a last name is required', async function () {
  await assertErrorHeaderTextPresent()
  await assertLastNameErrorPresent('Enter your last or family name')
})

Then('I am shown the confirmation page', async function () {
  await globals.confirmation.waitForPageLoad()
})

async function enterNameAndSubmit (firstName, lastName) {
  try {
    await globals.enterName.enterFirstName(firstName)
    await globals.enterName.enterLastName(lastName)
    await globals.enterName.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter the name and submit the page - ${error}`)
  }
}

async function assertErrorHeaderTextPresent () {
  try {
    await globals.enterName.waitForPageLoad()
    const errorHeader = await globals.enterName.getPageErrorHeaderText()
    expect(errorHeader).to.equal('There is a problem')
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert error header text is present - ${error}`)
  }
}

async function assertLastNameErrorPresent (expectedErrorMessage) {
  try {
    const errorMessage = await globals.enterName.getLastNameError()
    expect(errorMessage).to.be.equal(expectedErrorMessage)
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert last name error message is present - ${error}`)
  }
}
