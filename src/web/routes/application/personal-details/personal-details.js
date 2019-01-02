const { getPersonalDetails } = require('./get')

const initialisePersonalDetailsRoutes = (app) => {
  app.get('/personal-details', getPersonalDetails)
}

module.exports = {
  initialisePersonalDetailsRoutes
}
