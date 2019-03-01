module.exports = {
  ...require('./configure-get'),
  ...require('./configure-post'),
  ...require('./handle-post'),
  ...require('./handle-post-redirects'),
  ...require('./render-view'),
  ...require('./sanitize'),
  ...require('./session-details')
}
