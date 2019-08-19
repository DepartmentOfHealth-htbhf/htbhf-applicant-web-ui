const { isStepEnabled } = require('../../../web/routes/register-steps')
const { features } = require('../../../config')

const checkPageUrl = (url, result) => {
  return result.pageUrl !== url
    ? `Expected to GET ${url}, but was ${result.pageUrl}`
    : null
}

// Add a default page URL check to every test
const addCheckUrl = test => ({
  ...test,
  issueChecks: !test.issueChecks ? [checkPageUrl] : [...test.issueChecks, checkPageUrl]
})

const configureTestSuite = testSuite => testSuite.map(addCheckUrl).filter(isStepEnabled(features))

module.exports = {
  configureTestSuite
}
