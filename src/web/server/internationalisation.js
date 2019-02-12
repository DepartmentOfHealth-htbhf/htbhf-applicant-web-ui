const i18next = require('i18next')
const middleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const path = require('path')

const detection = (config) => ({
  order: ['querystring', 'cookie', 'header'],
  lookupQuerystring: 'lang',
  lookupCookie: 'lang',
  cookieSecure: !config.environment.USE_UNSECURE_COOKIE,
  caches: ['cookie']
})

const internationalisation = (config, app) => {
  i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
      ns: ['common', 'validation', 'buttons', 'errors'],
      defaultNS: 'common',
      detection: detection(config),
      backend: {
        loadPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.json')
      },
      fallbackLng: 'en'
    })

  app.use(middleware.handle(i18next))
}

module.exports = {
  internationalisation
}
