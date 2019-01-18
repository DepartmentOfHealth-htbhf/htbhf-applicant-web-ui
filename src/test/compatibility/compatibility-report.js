var reporter = require('cucumber-html-reporter')

var options = {
  theme: 'bootstrap',
  jsonFile: 'build/reports/compatibility-report.json',
  output: 'build/reports/compatibility-report.html',
  reportSuiteAsScenarios: true,
  launchReport: false
}

reporter.generate(options)
