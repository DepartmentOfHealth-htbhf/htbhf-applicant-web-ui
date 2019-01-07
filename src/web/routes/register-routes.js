const { registerStartRoute } = require('./start')
const { registerPersonalDetailsRoutes } = require('./application/personal-details')
const { registerCompleteRoute } = require('./application/complete')

const registerRoutes = (config, app) => {
  registerStartRoute(app)
  registerPersonalDetailsRoutes(config, app)
  registerCompleteRoute(app)
}

module.exports = {
  registerRoutes
}
