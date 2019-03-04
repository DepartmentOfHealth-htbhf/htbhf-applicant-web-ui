const { getCheck } = require('./get')
const { postCheck } = require('./post')
const { CHECK_URL } = require('../common/constants')
const { handleRequestForPath } = require('../middleware')

const registerCheckRoutes = (csrfProtection, steps, config, app) => {
  app
    .route(CHECK_URL)
    .get(csrfProtection, handleRequestForPath(steps), getCheck)
    .post(csrfProtection, handleRequestForPath(steps), postCheck(config))
}

module.exports = {
  registerCheckRoutes
}
