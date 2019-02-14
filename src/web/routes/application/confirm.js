const { isNilOrEmpty } = require('./common/predicates')

const getLanguageBase = (language) => {
  if (isNilOrEmpty(language)) {
    throw new Error('language provided in the request is blank')
  }
  return language.split('-')[0]
}

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
  getConfirmPage,
  getLanguageBase
}
