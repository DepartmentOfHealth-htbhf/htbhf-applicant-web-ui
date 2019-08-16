/* no-process-exit */
'use strict'

const pa11y = require('pa11y')
const Promise = require('bluebird')
const { getSIDCookieAndCSRFToken, postFormData } = require('../common/request')
const handleTestResults = require('./results')
const IGNORE_RULES = require('./ignore-rules')
const { URLS, BASE_URL } = require('./paths')

const FIRST_APPLY_PAGE_URL = URLS['DO_YOU_LIVE_IN_SCOTLAND']

const runAndAggregateIssueChecks = (url, result) => (results, checkFn) => {
  const resultOfCheck = checkFn(url, result)
  if (resultOfCheck !== null) {
    return [...results, resultOfCheck]
  }

  return results
}

/*
  Runs though the application, evaluating each page and performing post requests to populate the necessary
  data in the database.
 */
const runPa11yTests = async (pages) => {
  try {
    const { requestCookie, csrfToken } = await getSIDCookieAndCSRFToken(FIRST_APPLY_PAGE_URL)
    const headers = { Cookie: requestCookie }
    const formData = { '_csrf': csrfToken }
    const results = []

    await Promise.each(pages, async page => {
      console.log('Testing', page.url)

      // GET page URL and run a11y
      const result = await pa11y(page.url, { IGNORE_RULES, headers, timeout: 45000 })
      result.issues = page.issueChecks.reduce(runAndAggregateIssueChecks(page.url, result), [])
      results.push(result)

      // POST form data to allow next a11y page test
      if (typeof page.formData !== 'undefined') {
        const pageFormData = await page.formData(requestCookie)
        await postFormData(page.url, { ...formData, ...pageFormData }, requestCookie)
      }
    })

    return results
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const runTestsAndAggregateResults = async (acc, pages) => {
  const testResults = await runPa11yTests(pages)
  return [...acc, ...testResults]
}

const runAllTests = async (testSuites) => {
  try {
    console.log(`Running accessibility tests against ${BASE_URL}`)
    const results = await Promise.reduce(testSuites, runTestsAndAggregateResults, [])
    handleTestResults(results)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = { runAllTests }
