/* no-process-exit */
'use strict'

const { setupSuccessfulWiremockClaimMapping, deleteAllWiremockMappings } = require('../common/wiremock')
const { runAllTests } = require('./test-suite')
const { TEST_SUITES } = require('./tests')

/*
  Runs the accessibility test suite, having set up wiremock to mock the claim service.
 */
const runTestSuite = async (testSuites) => {
  try {
    await setupSuccessfulWiremockClaimMapping()
    await runAllTests(testSuites)
  } catch (error) {
    console.log(error)
    process.exit(1)
  } finally {
    await deleteAllWiremockMappings()
  }
}

runTestSuite(TEST_SUITES)
