const startRoutes = require('./start').initialiseRoutes

const initialiseRoutes = (app) => {
  startRoutes(app)
}

module.exports = {
  initialiseRoutes
}
