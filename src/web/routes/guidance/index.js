const { getPageMetadata } = require('./get-page-meta-data')

module.exports = {
  ...require('./guidance'),
  ...require('./pages'),
  getPageMetadata
}
