const { handleRequestForPath } = require('./middleware')
const { CONFIRM_URL } = require('./common/constants')

const pageContent = ({ translate }) => ({
  title: translate('confirm.title'),
  subTitle: translate('confirm.subTitle')
})

const getConfirmPage = (req, res) => {
  res.render('confirm', {
    ...pageContent({ translate: req.t })
  })
}

const registerConfirmRoute = (config, steps, app) => {
  app.get(CONFIRM_URL, handleRequestForPath(config, steps), getConfirmPage)
}

module.exports = {
  registerConfirmRoute,
  getConfirmPage
}
