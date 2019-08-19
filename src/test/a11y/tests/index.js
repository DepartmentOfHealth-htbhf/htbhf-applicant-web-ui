const { apply } = require('./apply')
const { iLiveInScotland } = require('./in-scotland')
const { guidance } = require('./guidance')

const checkPageUrl = (url, result) => {
  return result.pageUrl !== url
    ? `Expected to GET ${url}, but was ${result.pageUrl}`
    : null
}

const addUrlCheck = (testSuite) =>
  testSuite.map(test => ({
    ...test,
    issueChecks: !test.issueChecks ? [checkPageUrl] : [...test.issueChecks, checkPageUrl]
  }))

// Add a default page URL check to every test
const testSuitesWithUrlCheck = [apply, iLiveInScotland, guidance].map(addUrlCheck)

module.exports = {
  TEST_SUITES: testSuitesWithUrlCheck
}
