const { getCheck } = require('./get')
const { postCheck } = require('./post')
const { CHECK_URL } = require('../constants')

const registerCheckRoutes = (csrfProtection, config, app) => {
  app
    .route(CHECK_URL)
    .get(csrfProtection, getCheck)
    .post(csrfProtection, postCheck(config))
}

module.exports = {
  registerCheckRoutes
}
