const i18next = require('i18next')
const middleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const path = require('path')
const R = require('ramda')

const moment = require('moment')
const { COOKIE_EXPIRES_MILLISECONDS } = require('./session/cookie-settings')

const detection = (config) => ({
  order: ['querystring', 'cookie', 'header'],
  lookupQuerystring: 'lang',
  lookupCookie: 'lang',
  cookieSecure: !config.environment.USE_UNSECURE_COOKIE,
  caches: ['cookie']
})

const refreshCookieExpirationDate = (req, res, next) => {
  if (R.path(['i18n', 'options', 'detection'], req)) {
    req.i18n.options.detection.cookieExpirationDate = moment().add(COOKIE_EXPIRES_MILLISECONDS, 'milliseconds').toDate()
  }
  next()
}

const internationalisation = (config, app) => {
  i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
      // TODO - To allow translations add language codes to the whitelist array
      whitelist: ['en'],
      ns: ['common', 'validation', 'buttons', 'errors'],
      defaultNS: 'common',
      detection: detection(config),
      backend: {
        loadPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.json')
      },
      fallbackLng: 'en'
    })

  app.use(middleware.handle(i18next))
  app.use(refreshCookieExpirationDate)
}

module.exports = {
  internationalisation
}
