const { getCheck } = require('./get')
const { CHECK_URL } = require('../common/constants')
const { handleRequestForPath } = require('../middleware')

const registerCheckRoutes = (steps, config, app) => {
  app
    .route(CHECK_URL)
    .get(handleRequestForPath(config, steps), getCheck(steps))
}

module.exports = {
  registerCheckRoutes
}
