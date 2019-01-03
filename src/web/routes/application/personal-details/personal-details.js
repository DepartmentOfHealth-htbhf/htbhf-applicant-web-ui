const { getPersonalDetails } = require('./get')
const { postPersonalDetails } = require('./post')

const registerPersonalDetailsRoutes = (app) => {
  app
    .route('/personal-details')
    .get(getPersonalDetails)
    .post(postPersonalDetails)
}

module.exports = {
  registerPersonalDetailsRoutes
}
