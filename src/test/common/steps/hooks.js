const { Before, After } = require('cucumber')
const pages = require('./pages')

/**
 * Function to (re)initialise the Selenium driver and the page objects before each Scenario.
 */
Before(async function (scenario) {
  try {
    pages.initialise()
  } catch (error) {
    console.log('Error caught setting up the pages', error)
    throw new Error(error)
  }
})

/**
 * Function to quit the driver at the end of each Scenario.
 */
After(async function (scenario) {
  try {
    await pages.driverManager.quit(scenario)
  } catch (error) {
    console.log('Error caught trying to call quit from the driver', error)
    throw new Error(error)
  }
})
