/* no-process-exit */
'use strict'
require('dotenv')
const { runAllTests } = require('../a11y/test-suite')

/*
  Runs the accessibility test suite, relying on those tests to use process.env.APP_BASE_URL.
 */
const runTestSuite = async () => {
  try {
    runAllTests()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runTestSuite()
