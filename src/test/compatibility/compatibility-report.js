const reporter = require('multiple-cucumber-html-reporter')

const options = {
  theme: 'bootstrap',
  jsonDir: 'build/reports/compatibility',
  reportPath: 'build/reports/compatibility-report',
  reportSuiteAsScenarios: true,
  pageTitle: 'Compatibility Tests',
  reportName: 'Compatibility Tests',
  launchReport: false
}

reporter.generate(options)
