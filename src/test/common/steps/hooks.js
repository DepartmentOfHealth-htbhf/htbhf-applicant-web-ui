const { Before, After, BeforeAll, AfterAll } = require('cucumber')
const pages = require('./pages')
const { startWiremock, stopWiremock } = require('../wiremock/wiremock')

/**
 * Function to (re)initialise the Selenium driver and the page objects before each Scenario.
 */
Before(async function () {
  pages.initialise()
})

/**
 * Function to quit the driver at the end of each Scenario.
 */
After(function (scenario) {
  pages.driverManager.quit(scenario)
})

BeforeAll(async function () {
  await startWiremock()
})

AfterAll(function () {
  stopWiremock()
})
