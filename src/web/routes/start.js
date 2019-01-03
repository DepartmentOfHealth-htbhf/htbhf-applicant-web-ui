const getStartPage = (req, res) => {
  res.render('start', { title: 'Start page' })
}

const registerStartRoutes = (app) => {
  app.get('/', getStartPage)
}

module.exports = {
  registerStartRoutes
}
