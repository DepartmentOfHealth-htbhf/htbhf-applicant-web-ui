const { handleRequestForPath } = require('./application/middleware')

const pageContent = {
  title: 'Overview',
  heading: 'Overview'
}

const getStartPage = (req, res) => {
  res.render('start', pageContent)
}

const registerStartRoute = (config, steps, app) => {
  /**
   * `handleRequestForPath()` ensures the session is cleared when the start page
   * is requested after an apply journey has been completed.
   */
  app.get('/', handleRequestForPath(config, steps), getStartPage)
}

module.exports = {
  registerStartRoute
}
