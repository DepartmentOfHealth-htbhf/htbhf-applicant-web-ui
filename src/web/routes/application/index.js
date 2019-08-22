const { registerConfirmRoute } = require('./confirm')
const { registerCheckAnswersRoutes } = require('./check-answers')
const { registerTermsAndConditionsRoutes } = require('./terms-and-conditions')
const { registerFormRoutes } = require('./register-form-routes')
const { steps } = require('./steps')

module.exports = {
  registerConfirmRoute,
  registerCheckAnswersRoutes,
  registerTermsAndConditionsRoutes,
  registerFormRoutes,
  steps
}
