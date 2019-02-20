const pageContent = {
  // TODO setup cookies page to handle translations HTBHF-586
  heading: 'Cookies'
}

const getCookiesPage = (req, res) => {
  res.render('cookies', pageContent)
}

const registerCookiesRoute = (app) => {
  app.get('/cookies', getCookiesPage)
}

module.exports = {
  registerCookiesRoute
}
