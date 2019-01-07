const { getPersonalDetails } = require('./get')
const { postPersonalDetails } = require('./post')

const registerPersonalDetailsRoutes = (config, app) => {
  app
    .route('/personal-details')
    .get(getPersonalDetails)
    .post(postPersonalDetails(config))
}

module.exports = {
  registerPersonalDetailsRoutes
}
