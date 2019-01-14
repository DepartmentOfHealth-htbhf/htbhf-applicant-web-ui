const pageContent = {
  title: 'Overview',
  heading: 'Overview'
}

const getStartPage = (req, res) => {
  res.render('start', pageContent)
}

const registerStartRoute = (app) => {
  app.get('/', getStartPage)
}

module.exports = {
  registerStartRoute
}
