const compression = require('compression')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const { logger } = require('../logger')
const { configureSecurity } = require('./configure-security')
const { registerRoutes } = require('../routes')
const { initialiseSession } = require('./session')
const { registerErrorHandlers } = require('./error-handlers')
const { setViewEngine } = require('./view-engine')
const { internationalisation } = require('./internationalisation')
const { requestID } = require('./headers')

const configureStaticPaths = (app) => {
  /**
   * 1. GOV.UK Images and fonts
   * 2. GOV.UK Javascript
   * 3. GOV.UK local CSS compiled from SASS in node_modules/govuk-frontend
   */
  app.use('/assets', express.static(path.resolve('node_modules/govuk-frontend/assets'))) /* 1 */
  app.use('/assets', express.static(path.resolve('node_modules/govuk-frontend'))) /* 2 */
  app.use('/assets', express.static(path.resolve('src/web/assets'))) /* 3 */
}

const listen = (config, app) =>
  app.listen(config.server.PORT, () => {
    logger().info(`App listening on port ${config.server.PORT}`)
  })

const start = (config, app) => () => {
  /**
   * Apply internationalisation as first middleware in queue to ensure
   * translation function is available in error handlers
   */
  internationalisation(config, app)

  app.use(requestID)
  app.use(compression())
  app.use(bodyParser.urlencoded({ extended: false }))

  configureSecurity(app)
  setViewEngine(config, app)
  registerRoutes(config, app)
  registerErrorHandlers(app)
  listen(config, app)
}

const initialise = (config, app) => {
  configureStaticPaths(app)
  initialiseSession(start(config, app), config, app)
}

module.exports = {
  initialise
}
