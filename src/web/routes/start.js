const getStartPage = (req, res) => {
  res.render('start', { heading: 'Start page' })
}

const registerStartRoute = (app) => {
  app.get('/', getStartPage)
}

module.exports = {
  registerStartRoute
}
