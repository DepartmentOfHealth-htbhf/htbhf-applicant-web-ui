const { handleRequestForPath } = require('./middleware')
const { CONFIRM_URL } = require('./common/constants')

const pageContent = ({ translate }) => ({
  title: translate('confirm.title'),
  subTitle: translate('confirm.subTitle')
})

const getConfirmPage = (req, res) => {
  req.session.destroy()
  res.clearCookie('lang')
  res.render('confirm', {
    ...pageContent({ translate: req.t })
  })
}

const registerConfirmRoute = (steps, app) => {
  app.get(CONFIRM_URL, handleRequestForPath(steps), getConfirmPage)
}

module.exports = {
  registerConfirmRoute,
  getConfirmPage
}
