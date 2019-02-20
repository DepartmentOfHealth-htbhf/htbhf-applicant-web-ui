const moment = require('moment')
const reporter = require('cucumber-html-reporter')

const DATE_FORMAT = 'dddd Do MMMM YYYY HH:mm'

const options = {
  theme: 'bootstrap',
  jsonFile: 'build/reports/compatibility-report.json',
  output: 'build/reports/compatibility-report.html',
  reportSuiteAsScenarios: true,
  brandTitle: 'Compatibility Tests',
  launchReport: false,
  metadata: {
    'Report Run Time': moment(new Date()).format(DATE_FORMAT)
  }
}

reporter.generate(options)
