const csrf = require('csurf')
const { registerStartRoute } = require('./start')
const { registerConfirmRoute } = require('./application/confirm')
const { registerCheckRoutes } = require('./application/check')
const { registerCookiesRoute } = require('./cookies')
const { getLanguageBase } = require('./language')
const { registerHoldingRoute } = require('./application/holding')

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
  app.use(setCommonTemplateValues)

  if (config.environment.MAINTENANCE_MODE) {
    registerHoldingRoute(config, app)
  } else {
    const csrfProtection = csrf({})
    registerFormRoutes(csrfProtection, steps, app)
    registerStartRoute(app)
    registerCheckRoutes(csrfProtection, steps, config, app)
    registerConfirmRoute(app)
    registerCookiesRoute(app)
  }
}

module.exports = {
  registerRoutes
}
