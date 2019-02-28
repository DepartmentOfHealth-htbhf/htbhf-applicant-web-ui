const csrf = require('csurf')
const { registerStartRoute } = require('./start')
const { registerConfirmRoute } = require('./application/confirm')
const { registerCheckRoutes } = require('./application/check')
const { registerCookiesRoute } = require('./cookies')
const { getLanguageBase } = require('./language')
const { registerHoldingRoute } = require('./application/holding/holding')
const { getVCAPServicesVariable } = require('../../config/vcap-services')
const { toBoolean } = require('../../config/to-boolean')

const { steps } = require('./application/steps')
const { registerFormRoutes } = require('./application/register-form-routes')

const setCommonTemplateValues = (req, res, next) => {
  res.locals.htmlLang = req.language
  res.locals.language = getLanguageBase(req.language)
  res.locals.cookieLinkName = req.t('cookies.linkName')
  res.locals.back = req.t('back')
  next()
}

const registerRoutes = (config, app) => {
  const csrfProtection = csrf({})

  app.use(setCommonTemplateValues)

  const maintenanceMode = getVCAPServicesVariable('MAINTENANCE_MODE', false)

  if (toBoolean(maintenanceMode)) {
    registerHoldingRoute(app)
  } else {
    registerFormRoutes(csrfProtection, steps, app)
    registerStartRoute(app)
    registerCheckRoutes(csrfProtection, config, app)
    registerConfirmRoute(app)
    registerCookiesRoute(app)
  }
}

module.exports = {
  registerRoutes
}
