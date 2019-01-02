const { initialiseStartRoutes } = require('./start')
const { initialisePersonalDetailsRoutes } = require('./application/personal-details')

const initialiseRoutes = (app) => {
  initialiseStartRoutes(app)
  initialisePersonalDetailsRoutes(app)
}

module.exports = {
  initialiseRoutes
}
