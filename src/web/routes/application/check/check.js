const { getCheck } = require('./get')
const { postCheck } = require('./post')

const registerCheckRoutes = (csrfProtection, config, app) => {
  app
    .route('/check')
    .get(csrfProtection, getCheck)
    .post(csrfProtection, postCheck(config))
}

module.exports = {
  registerCheckRoutes
}
