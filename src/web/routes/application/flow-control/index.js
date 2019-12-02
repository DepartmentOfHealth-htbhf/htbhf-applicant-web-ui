const { getPreviousPath } = require('./get-previous-path')
const testUtils = require('./test-utils')
const states = require('./states')
const { setAdditionalDataForStep } = require('./session-accessors')

module.exports = {
  ...require('./state-machine'),
  ...require('./middleware'),
  getPreviousPath,
  testUtils,
  states,
  setAdditionalDataForStep
}
