const getStartPage = (req, res) => {
  res.render('start', { heading: 'Overview' })
}

const registerStartRoute = (app) => {
  app.get('/', getStartPage)
}

module.exports = {
  registerStartRoute
}
