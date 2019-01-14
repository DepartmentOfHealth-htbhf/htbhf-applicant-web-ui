const { Before, After } = require('cucumber')
const globals = require('./globals')

Before(async function () {
  globals.initialise()
})

After(function () {
  globals.driver.quit()
})
