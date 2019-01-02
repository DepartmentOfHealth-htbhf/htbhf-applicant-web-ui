const getStartPage = (req, res) => {
  res.render('start', { title: 'Start page' })
}

const initialiseRoutes = (app) => {
  app.get('/', getStartPage)
}

module.exports = {
  initialiseRoutes
}
