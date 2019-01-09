const csrf = require('csurf')
const { registerStartRoute } = require('./start')
const { registerPersonalDetailsRoutes } = require('./application/personal-details')
const { registerCompleteRoute } = require('./application/complete')
const { registerConfirmRoutes } = require('./application/confirm')

const registerRoutes = (config, app) => {
  const csrfProtection = csrf({})
  registerStartRoute(app)
  registerPersonalDetailsRoutes(csrfProtection, app)
  registerConfirmRoutes(csrfProtection, config, app)
  registerCompleteRoute(app)
}

module.exports = {
  registerRoutes
}
