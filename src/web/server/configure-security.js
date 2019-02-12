const helmet = require('helmet')

const configureSecurity = (app) => {
  app.use(helmet())

  /**
   * 'unsafe-inline' is listed in scriptSrc for two use cases:
   *
   * 1. To allow Google Tag Manager to function correctly - if custom GTM javascript
   *    variables are required then 'unsafe-eval' will also need to be listed.
   * 2. To initialise GOV.UK front end javascript - this could be addressed by initialising
   *    inside a javascript file, see:
   *    https://github.com/alphagov/govuk-frontend/blob/master/docs/installation/installing-with-npm.md
   */
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://www.googletagmanager.com', 'https://www.google-analytics.com'],
      imgSrc: ["'self'", 'https://www.google-analytics.com']
    }
  }))
}

module.exports = {
  configureSecurity
}
