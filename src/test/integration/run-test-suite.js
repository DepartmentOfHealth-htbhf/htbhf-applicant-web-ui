/* no-process-exit */
'use strict'
require('dotenv')
const { runAllTests } = require('../a11y/test-suite')
const { TEST_SUITE } = require('../a11y/tests')

/*
  Runs the accessibility test suite, relying on those tests to use process.env.APP_BASE_URL.
 */
const runTestSuite = async (testSuite) => {
  try {
    await runAllTests(testSuite)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runTestSuite(TEST_SUITE)
