const { getEnterName } = require('./get')
const { postEnterName } = require('./post')
const { validate } = require('./validate')
const { getSessionDetails } = require('./session-details')
const { sanitize } = require('./sanitize')

const registerEnterNameRoutes = (csrfProtection, app) => {
  app
    .route('/enter-name')
    .get(csrfProtection, getSessionDetails, getEnterName)
    .post(csrfProtection, sanitize, validate, getSessionDetails, postEnterName)
}

module.exports = {
  registerEnterNameRoutes
}
