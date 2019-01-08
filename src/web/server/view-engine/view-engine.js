const nunjucks = require('nunjucks')
const { toErrorList } = require('./filters')

const setViewEngine = (app) => {
  const env = nunjucks.configure([
    'src/web/views',
    'node_modules/govuk-frontend/',
    'node_modules/govuk-frontend/components/'
  ], {
    autoescape: true,
    express: app,
    noCache: true
  })

  env.addFilter('toErrorList', toErrorList)

  app.set('view engine', 'njk')
}

module.exports = {
  setViewEngine
}
