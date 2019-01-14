const { Before, After } = require('cucumber')
const globals = require('./globals')

/**
 * Function to (re)initialise the Selenium driver and the page objects before each Scenario.
 */
Before(async function () {
  globals.initialise()
})

/**
 * Function to quite the driver at the end of each Scenario.
 */
After(function () {
  globals.driver.quit()
})
