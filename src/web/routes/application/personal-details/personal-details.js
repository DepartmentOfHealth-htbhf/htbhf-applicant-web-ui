const { getPersonalDetails } = require('./get')
const { postPersonalDetails } = require('./post')
const { validate } = require('./validate')
const { getSessionDetails } = require('./session-details')
const { sanitize } = require('./sanitize')

const registerPersonalDetailsRoutes = (csrfProtection, app) => {
  app
    .route('/personal-details')
    .get(csrfProtection, getSessionDetails, getPersonalDetails)
    .post(csrfProtection, sanitize, validate, getSessionDetails, postPersonalDetails)
}

module.exports = {
  registerPersonalDetailsRoutes
}
