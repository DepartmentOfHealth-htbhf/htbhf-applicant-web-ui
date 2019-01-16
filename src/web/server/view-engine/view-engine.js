const nunjucks = require('nunjucks')
const { toErrorList, getErrorForField } = require('./filters')

const setViewEngine = (config, app) => {
  const env = nunjucks.configure([
    'src/web/views',
    'node_modules/govuk-frontend/',
    'node_modules/govuk-frontend/components/'
  ], {
    autoescape: true,
    express: app,
    noCache: config.server.CACHE_VIEW_TEMPLATES
  })

  env.addFilter('toErrorList', toErrorList)
  env.addFilter('getErrorForField', getErrorForField)

  app.set('view engine', 'njk')
}

module.exports = {
  setViewEngine
}
