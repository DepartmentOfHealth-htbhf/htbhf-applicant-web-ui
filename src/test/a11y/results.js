/* eslint-disable no-console, no-process-exit */
'use strict'

const hasIssues = result => result.issues.length

const handleTestResults = results => {
  const resultsWithIssues = results.filter(hasIssues)

  if (resultsWithIssues.length) {
    console.error('Accessibility issues have been found:')
    resultsWithIssues.forEach(console.error)
    process.exit(1)
  } else {
    console.log(`No accessibility issues found (${results.length} results in total)`)
  }
}

module.exports = handleTestResults
