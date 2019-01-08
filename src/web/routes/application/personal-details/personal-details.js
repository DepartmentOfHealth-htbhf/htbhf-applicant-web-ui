const { getPersonalDetails } = require('./get')
const { postPersonalDetails } = require('./post')

const registerPersonalDetailsRoutes = (csrfProtection, app) => {
  app
    .route('/personal-details')
    .get(csrfProtection, getPersonalDetails)
    .post(csrfProtection, postPersonalDetails)
}

module.exports = {
  registerPersonalDetailsRoutes
}
