const csrf = require('csurf')
const { registerStartRoute } = require('./start')
const { registerCompleteRoute } = require('./application/complete')
const { registerConfirmRoutes } = require('./application/confirm')

const { steps } = require('./application/steps')
const { registerFormRoutes } = require('./application/register-form-routes')

const registerRoutes = (config, app) => {
  const csrfProtection = csrf({})

  registerFormRoutes(csrfProtection, steps, app)
  registerStartRoute(app)
  registerConfirmRoutes(csrfProtection, config, app)
  registerCompleteRoute(app)
}

module.exports = {
  registerRoutes
}
