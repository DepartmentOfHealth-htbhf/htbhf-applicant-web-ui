const reporter = require('cucumber-html-reporter')

const options = {
  theme: 'bootstrap',
  jsonFile: 'build/reports/acceptance-report.json',
  output: 'build/reports/acceptance-report.html',
  reportSuiteAsScenarios: true,
  brandTitle: 'Acceptance Tests',
  launchReport: false
}

reporter.generate(options)
