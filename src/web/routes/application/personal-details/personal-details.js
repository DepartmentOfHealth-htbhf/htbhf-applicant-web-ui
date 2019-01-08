const { getPersonalDetails } = require('./get')
const { postPersonalDetails } = require('./post')
const { validate } = require('./validate')
const { getSessionDetails } = require('./session-details')

const registerPersonalDetailsRoutes = (csrfProtection, app) => {
  app
    .route('/personal-details')
    .get(csrfProtection, getSessionDetails, getPersonalDetails)
    .post(csrfProtection, validate, getSessionDetails, postPersonalDetails)
}

module.exports = {
  registerPersonalDetailsRoutes
}
