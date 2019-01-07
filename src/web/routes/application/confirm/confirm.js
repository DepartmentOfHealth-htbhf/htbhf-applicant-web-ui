const { getConfirm } = require('./get')
const { postConfirm } = require('./post')

const registerConfirmRoutes = (config, app) => {
  app
    .route('/confirm')
    .get(getConfirm)
    .post(postConfirm(config))
}

module.exports = {
  registerConfirmRoutes
}
