const { Before, After } = require('cucumber')
const pages = require('./pages')

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
  pages.driver.quit(scenario)
})
