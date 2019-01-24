const pageContent = {
  title: 'Application successful',
  heading: 'Application successful'
}

const getConfirmPage = (req, res) => {
  res.clearCookie('lang')
  res.render('confirm', pageContent)
}

const registerConfirmRoute = (app) => {
  app.get('/confirm', getConfirmPage)
}

module.exports = {
  registerConfirmRoute
}
