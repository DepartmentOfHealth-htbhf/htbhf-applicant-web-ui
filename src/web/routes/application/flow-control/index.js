const { getPreviousPath } = require('./get-previous-path')
const testUtils = require('./test-utils')

module.exports = {
  ...require('./state-machine'),
  ...require('./middleware'),
  getPreviousPath,
  testUtils
}
