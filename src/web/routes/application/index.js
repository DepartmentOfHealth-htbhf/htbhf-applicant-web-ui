const { registerConfirmRoute } = require('./confirm')
const { registerCheckRoutes } = require('./check')
const { registerTermsAndConditionsRoutes } = require('./terms-and-conditions')
const { registerFormRoutes } = require('./register-form-routes')
const { steps } = require('./steps')

module.exports = {
  registerConfirmRoute,
  registerCheckRoutes,
  registerTermsAndConditionsRoutes,
  registerFormRoutes,
  steps
}
