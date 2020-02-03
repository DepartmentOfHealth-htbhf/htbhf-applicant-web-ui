/* eslint-disable no-console, no-process-exit */
'use strict'

const hasIssues = result => result.issues.length

const handleTestResults = results => {
  const resultsWithIssues = results.filter(hasIssues)

  if (resultsWithIssues.length) {
    console.error('Accessibility issues have been found:')
    // convert the results to json, pretty-printing the results with indentation of 2 spaces.
    // (null argument is placeholder for a function to transform the results)
    console.error(JSON.stringify(resultsWithIssues, null, 2))
    process.exit(1)
  } else {
    console.log(`No accessibility issues found (${results.length} results in total)`)
  }
}

module.exports = handleTestResults
