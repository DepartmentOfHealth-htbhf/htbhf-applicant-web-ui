const nunjucks = require('nunjucks')

const { camelToKebabCase, toErrorList, getErrorForField } = require('./filters')

const setViewEngine = (config, app) => {
  const env = nunjucks.configure([
    'src/web/views',
    'node_modules/govuk-frontend/'
  ], {
    autoescape: true,
    express: app,
    noCache: config.server.NO_CACHE_VIEW_TEMPLATES
  })

  env.addFilter('camelToKebabCase', camelToKebabCase)
  env.addFilter('toErrorList', toErrorList)
  env.addFilter('getErrorForField', getErrorForField)

  env.addGlobal('gaTrackingId', config.environment.GA_TRACKING_ID)

  app.set('view engine', 'njk')
}

module.exports = {
  setViewEngine
}
