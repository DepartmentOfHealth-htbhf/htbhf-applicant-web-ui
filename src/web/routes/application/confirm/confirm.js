const { getConfirm } = require('./get')
const { postConfirm } = require('./post')

const registerConfirmRoutes = (csrfProtection, config, app) => {
  app
    .route('/confirm')
    .get(csrfProtection, getConfirm)
    .post(csrfProtection, postConfirm(config))
}

module.exports = {
  registerConfirmRoutes
}
