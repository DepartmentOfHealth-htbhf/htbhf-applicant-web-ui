const { getPreviousPath } = require('./get-previous-path')

module.exports = {
  ...require('./state-machine'),
  ...require('./middleware'),
  getPreviousPath
}
