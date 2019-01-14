var reporter = require('cucumber-html-reporter')

var options = {
  theme: 'bootstrap',
  jsonFile: 'build/reports/cucumber-report.json',
  output: 'build/reports/cucumber-report.html',
  reportSuiteAsScenarios: true,
  launchReport: false
}

reporter.generate(options)
