module.exports = {
  ...require('./configure-post'),
  ...require('./handle-post'),
  ...require('./render-view'),
  ...require('./sanitize'),
  ...require('./session-details'),
  ...require('./configure-get')
}
