const { registerStartRoute } = require('./start')
const { registerPersonalDetailsRoutes } = require('./application/personal-details')
const { registerCompleteRoute } = require('./application/complete')
const { registerConfirmRoutes } = require('./application/confirm')

const registerRoutes = (config, app) => {
  registerStartRoute(app)
  registerPersonalDetailsRoutes(app)
  registerConfirmRoutes(config, app)
  registerCompleteRoute(app)
}

module.exports = {
  registerRoutes
}
