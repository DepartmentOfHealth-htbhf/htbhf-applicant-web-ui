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
const numCores = require('os').cpus().length

const configureStaticPaths = (app) => {
  /**
   * 1. GOV.UK Images and fonts
   * 2. GOV.UK Javascript
   * 3. GOV.UK local CSS compiled from SASS in node_modules/govuk-frontend
   */
  app.use('/assets', express.static(path.resolve('node_modules/govuk-frontend/assets'))) /* 1 */
  app.use('/assets', express.static(path.resolve('node_modules/govuk-frontend'))) /* 2 */
  app.use('/assets', express.static(path.resolve('src/web/public'))) /* 3 */
}

const listen = (config, app) =>
  app.listen(config.server.PORT, () => {
    logger.info(`App listening on port ${config.server.PORT}`)
    logger.info(`Number of cores available: ${numCores} (node uses only a single core)`)
  })

const start = (config, app) => () => {
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
  // Configure static paths before registering any middleware to ensure
  // assets are available to all middleware
  configureStaticPaths(app)

  // Apply internationalisation before initialising session to ensure
  // translation function is available to session middleware
  internationalisation(config, app)
  initialiseSession(start(config, app), config, app)
}

module.exports = {
  initialise
}
