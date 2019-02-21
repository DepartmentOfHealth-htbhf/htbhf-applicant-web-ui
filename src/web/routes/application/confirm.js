const { getLanguageBase } = require('./common/language')

const pageContent = ({ language, translate }) => ({
  title: translate('confirm.title'),
  subTitle: translate('confirm.subTitle'),
  language: language
})

const getConfirmPage = (req, res) => {
  req.session.destroy()
  res.clearCookie('lang')
  res.render('confirm', pageContent({ language: getLanguageBase(req.language), translate: req.t }))
}

const registerConfirmRoute = (app) => {
  app.get('/confirm', getConfirmPage)
}

module.exports = {
  registerConfirmRoute,
  getConfirmPage
}
