/* no-process-exit */
'use strict'
require('dotenv')
const { setupSuccessfulWiremockClaimMapping, deleteAllWiremockMappings } = require('../common/wiremock')
const { runAllTests } = require('./test-suite')

/*
  Runs the accessibility test suite, having set up wiremock to mock the claim service.
 */
const runTestSuite = async () => {
  try {
    await setupSuccessfulWiremockClaimMapping()
    runAllTests()
  } catch (error) {
    console.log(error)
    process.exit(1)
  } finally {
    await deleteAllWiremockMappings()
  }
}

runTestSuite()
