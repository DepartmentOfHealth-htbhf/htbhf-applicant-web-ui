const { registerStartRoutes } = require('./start')
const { registerPersonalDetailsRoutes } = require('./application/personal-details')

const registerRoutes = (app) => {
  registerStartRoutes(app)
  registerPersonalDetailsRoutes(app)
}

module.exports = {
  registerRoutes
}
