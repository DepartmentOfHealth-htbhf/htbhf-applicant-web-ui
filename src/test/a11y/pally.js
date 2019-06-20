'use strict'

const pa11y = require('pa11y')

module.exports = (ignore, headers) => async (url) => {
  const result = await pa11y(url, { ignore, headers })
  if (result.pageUrl !== url) {
    result.issues.push(`Expected to GET ${url}, but was ${result.pageUrl}`)
  }
  return result
}
