const moment = require('moment')
const reporter = require('cucumber-html-reporter')

const DATE_FORMAT = 'dddd Do MMMM YYYY HH:mm'

const options = {
  theme: 'bootstrap',
  jsonFile: 'build/reports/acceptance-report.json',
  output: 'build/reports/acceptance-report.html',
  reportSuiteAsScenarios: true,
  brandTitle: 'Acceptance Tests',
  launchReport: false,
  metadata: {
    'Tests completed at': moment(new Date()).format(DATE_FORMAT)
  }
}

reporter.generate(options)
