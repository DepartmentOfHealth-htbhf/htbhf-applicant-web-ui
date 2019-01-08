const { getPersonalDetails } = require('./get')
const { postPersonalDetails } = require('./post')
const { validate } = require('./validate')

const registerPersonalDetailsRoutes = (csrfProtection, app) => {
  app
    .route('/personal-details')
    .get(csrfProtection, getPersonalDetails)
    .post(csrfProtection, validate, postPersonalDetails)
}

module.exports = {
  registerPersonalDetailsRoutes
}
