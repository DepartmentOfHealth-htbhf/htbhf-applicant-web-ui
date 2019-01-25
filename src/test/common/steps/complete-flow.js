const { Given, When } = require('cucumber')

const { enterNameAndSubmit, enterNinoAndSubmit, enterDateOfBirth } = require('./common-steps')

const pages = require('./pages')

const VALID_NINO = 'QQ123456C'

Given('I am on the first page of the application', async function () {
  await pages.enterName.open(pages.url)
})

When(/^I complete the application with valid details$/, async function () {
  await enterNameAndSubmit('Lisa', 'Simpson')
  await enterNinoAndSubmit(VALID_NINO)
  await enterDateOfBirth('30', '12', '1980')
})
