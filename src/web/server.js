const express = require('express')
const path = require('path')
const nunjucks = require('nunjucks')
const { initialiseRoutes } = require('./routes')

const configureStaticPaths = (app) => {
  /**
   * 1. GOV.UK Images and fonts
   * 2. GOV.UK Javascript
   * 3. GOV.UK local CSS compiled from SASS in node_modules/govuk-frontend
   */
  app.use('/assets', express.static(path.resolve('node_modules/govuk-frontend/assets'))) /* 1 */
  app.use('/assets', express.static(path.resolve('node_modules/govuk-frontend'))) /* 2 */
  app.use('/assets', express.static(path.join(__dirname, 'assets'))) /* 3 */
}

const setViewEngine = (app) => {
  nunjucks.configure([
    'src/web/views',
    'node_modules/govuk-frontend/',
    'node_modules/govuk-frontend/components/'
  ], {
    autoescape: true,
    express: app,
    noCache: true
  })

  app.set('view engine', 'njk')
}

const listen = (config, app) =>
  app.listen(config.server.PORT, () => console.log(
    `App listening on port ${config.server.PORT}`)
  )

const start = (config, app) => {
  configureStaticPaths(app)
  setViewEngine(app)
  initialiseRoutes(app)
  listen(config, app)
}

module.exports = {
  start
}
