'use strict'

const pa11y = require('pa11y')

module.exports = (ignore, headers) => async (url) => {
  return pa11y(url, { ignore, headers })
}
