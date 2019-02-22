const { getLanguageBase } = require('./application/common/language')

const pageContent = ({ language, translate }) => ({
  title: translate('cookies.title'),
  language: language
})

const getCookiesPage = (req, res) => {
  res.render('cookies', pageContent({ language: getLanguageBase(req.language), translate: req.t }))
}

const registerCookiesRoute = (app) => {
  app.get('/cookies', getCookiesPage)
}

module.exports = {
  registerCookiesRoute
}
