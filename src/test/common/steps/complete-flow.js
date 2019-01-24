const { When } = require('cucumber')

const { enterNameAndSubmit, enterNinoAndSubmit, enterDateOfBirth } = require('./common-steps')

const VALID_NINO = 'QQ123456C'

When(/^I enter a valid set of details$/, async function () {
  await enterNameAndSubmit('Lisa', 'Simpson')
  await enterNinoAndSubmit(VALID_NINO)
  await enterDateOfBirth('30', '12', '1980')
})
