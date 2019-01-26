const reporter = require('cucumber-html-reporter')

const options = {
  theme: 'bootstrap',
  jsonDir: 'build/reports/compatibility',
  output: 'build/reports/compatibility-report.html',
  reportSuiteAsScenarios: true,
  brandTitle: 'Compatibility Tests',
  launchReport: false
}

reporter.generate(options)
