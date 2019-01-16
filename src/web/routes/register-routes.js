const csrf = require('csurf')
const { registerStartRoute } = require('./start')
const { registerEnterNameRoutes } = require('./application/enter-name')
const { registerEnterNinoRoutes } = require('./application/enter-nino')
const { registerCompleteRoute } = require('./application/complete')
const { registerConfirmRoutes } = require('./application/confirm')

const registerRoutes = (config, app) => {
  const csrfProtection = csrf({})
  registerStartRoute(app)
  registerEnterNameRoutes(csrfProtection, app)
  registerEnterNinoRoutes(csrfProtection, app)
  registerConfirmRoutes(csrfProtection, config, app)
  registerCompleteRoute(app)
}

module.exports = {
  registerRoutes
}
