const { handleRequestForPath } = require('./middleware')
const { CONFIRM_URL } = require('./common/constants')

const getConfirmPage = (req, res) => {
  if (req.session.eligibilityStatus === 'ELIGIBLE') {
    return res.render('confirm', {
      title: req.t('confirm.title'),
      subTitle: req.t('confirm.subTitle')
    })
  }

  const eligibilityStatus = req.session.eligibilityStatus.toLowerCase()
  return res.render('unsuccessful-application', {
    ...{
      title: req.t('unsuccessfulApplication.title'),
      heading: req.t('unsuccessfulApplication.title'),
      content: req.t(`unsuccessfulApplication.content.${eligibilityStatus}`)
    }
  })
}

const registerConfirmRoute = (config, steps, app) => {
  app.get(CONFIRM_URL, handleRequestForPath(config, steps), getConfirmPage)
}

module.exports = {
  registerConfirmRoute,
  getConfirmPage
}
