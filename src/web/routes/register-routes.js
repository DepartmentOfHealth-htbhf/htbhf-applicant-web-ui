const csrf = require('csurf')
const { registerStartRoute } = require('./start')
const { registerConfirmRoute } = require('./application/confirm')
const { registerCheckRoutes } = require('./application/check')
const { registerCookiesRoute } = require('./cookies')
const { registerPrivacyNoticeRoute } = require('./privacy-notice')
const { getLanguageBase } = require('./language')
const { registerHoldingRoute } = require('./application/holding')
const { registerPageNotFoundRoute } = require('./application/page-not-found')
const { registerUnsuccessfulApplicationRoute } = require('./application/unsuccessful-application')

const { steps } = require('./application/steps')
const { registerFormRoutes } = require('./application/register-form-routes')

const setCommonTemplateValues = (req, res, next) => {
  res.locals.htmlLang = req.language
  res.locals.language = getLanguageBase(req.language)
  res.locals.cookieLinkName = req.t('cookies.linkName')
  res.locals.privacyNoticeLinkName = req.t('privacyNotice.linkName')
  res.locals.back = req.t('back')
  next()
}

const registerRoutes = (config, app) => {
  app.use(setCommonTemplateValues)

  if (config.environment.MAINTENANCE_MODE) {
    registerHoldingRoute(config, app)
  } else {
    const csrfProtection = csrf({})
    registerFormRoutes(config, csrfProtection, steps, app)
    registerStartRoute(app)
    registerCheckRoutes(csrfProtection, steps, config, app)
    registerConfirmRoute(config, steps, app)
    registerUnsuccessfulApplicationRoute(config, steps, app)
    registerCookiesRoute(app)
    registerPrivacyNoticeRoute(app)
    registerPageNotFoundRoute(app)
  }
}

module.exports = {
  registerRoutes
}
