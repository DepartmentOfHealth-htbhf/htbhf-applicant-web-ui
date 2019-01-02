const getStartPage = (req, res) => {
  res.render('start', { title: 'Start page' })
}

const initialiseStartRoutes = (app) => {
  app.get('/', getStartPage)
}

module.exports = {
  initialiseStartRoutes
}
