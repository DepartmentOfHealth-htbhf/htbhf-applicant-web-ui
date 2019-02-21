const { getLanguageBase } = require('./application/common/language')

const pageContent = ({ language }) => ({
  // TODO setup cookies page to handle translations HTBHF-586
  heading: 'Cookies',
  language: language
})

const getCookiesPage = (req, res) => {
  res.render('cookies', pageContent({ language: getLanguageBase(req.language) }))
}

const registerCookiesRoute = (app) => {
  app.get('/cookies', getCookiesPage)
}

module.exports = {
  registerCookiesRoute
}
