const getStartPage = (req, res) => {
  res.render('start', { title: 'Start page' })
}

const registerStartRoute = (app) => {
  app.get('/', getStartPage)
}

module.exports = {
  registerStartRoute
}
