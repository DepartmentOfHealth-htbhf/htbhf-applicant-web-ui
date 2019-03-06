const { getCheck } = require('./get')
const { postCheck } = require('./post')
const { CHECK_URL } = require('../common/constants')
const { handleRequestForPath } = require('../middleware')

const registerCheckRoutes = (csrfProtection, steps, config, app) => {
  app
    .route(CHECK_URL)
    .get(csrfProtection, handleRequestForPath(config, steps), getCheck)
    .post(csrfProtection, handleRequestForPath(config, steps), postCheck(steps, config))
}

module.exports = {
  registerCheckRoutes
}
