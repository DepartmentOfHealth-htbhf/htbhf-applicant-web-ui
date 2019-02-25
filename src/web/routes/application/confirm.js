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

const registerConfirmRoute = (app) => {
  app.get('/confirm', getConfirmPage)
}

module.exports = {
  registerConfirmRoute,
  getConfirmPage
}
