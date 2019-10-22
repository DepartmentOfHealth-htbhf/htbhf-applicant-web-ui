/* no-process-exit */
'use strict'

const { setupSuccessfulWiremockClaimMapping, deleteAllWiremockMappings, setupPostcodeLookupWithResults } = require('./wiremock')
const { runAllTests } = require('./test-suite')
const { TEST_SUITE } = require('./tests')
const { POSTCODE } = require('./constants')

/*
  Runs the accessibility test suite, having set up wiremock to mock the claim service.
 */
const runTestSuite = async (testSuite) => {
  try {
    await setupSuccessfulWiremockClaimMapping()
    await setupPostcodeLookupWithResults(POSTCODE)
    await runAllTests(testSuite)
  } catch (error) {
    console.log(error)
    process.exit(1)
  } finally {
    await deleteAllWiremockMappings()
  }
}

runTestSuite(TEST_SUITE)
