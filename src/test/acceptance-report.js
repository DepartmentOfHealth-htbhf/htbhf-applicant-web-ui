var reporter = require('cucumber-html-reporter')

var options = {
  theme: 'bootstrap',
  jsonFile: 'build/reports/acceptance-report.json',
  output: 'build/reports/acceptance-report.html',
  reportSuiteAsScenarios: true,
  launchReport: false
}

reporter.generate(options)
