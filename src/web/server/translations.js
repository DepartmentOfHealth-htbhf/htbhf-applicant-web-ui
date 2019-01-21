const i18next = require('i18next')
const middleware = require('i18next-express-middleware')

const detection = {
  order: ['querystring', 'cookie', 'header'],
  lookupQuerystring: 'lang',
  lookupCookie: 'lang'
  // optional expire and domain for set cookie
  // cookieExpirationDate: new Date(),
  // cookieDomain: 'myDomain',
  // cookieSecure: true // if need secure cookie
}

i18next.use(middleware.LanguageDetector).init({
  preload: ['en'],
  detection
})

const translations = (config, app) => {
  app.use(middleware.handle(i18next))
}

module.exports = {
  translations
}
