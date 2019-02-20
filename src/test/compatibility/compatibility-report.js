const moment = require('moment')
const reporter = require('multiple-cucumber-html-reporter')
const { version } = require('../../../package.json')

const DATE_FORMAT = 'dddd Do MMMM YYYY HH:mm'

const options = {
  theme: 'bootstrap',
  jsonDir: 'build/reports/compatibility',
  reportPath: 'build/reports/compatibility-report',
  reportSuiteAsScenarios: true,
  pageTitle: 'Compatibility Tests',
  reportName: 'Compatibility Tests',
  launchReport: false,
  customData: {
    'title': 'Report info',
    'data': [
      { 'label': 'Tests completed at', 'value': moment(new Date()).format(DATE_FORMAT) },
      { 'label': 'htbhf-applicant-web-ui version', 'value': version }
    ]
  }
}

reporter.generate(options)
