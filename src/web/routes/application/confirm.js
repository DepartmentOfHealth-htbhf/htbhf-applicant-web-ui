const pageContent = {
  title: 'Application successful',
  heading: 'Application successful'
}

const getCompletePage = (req, res) => {
  res.render('confirm', pageContent)
}

const registerCompleteRoute = (app) => {
  app.get('/confirm', getCompletePage)
}

module.exports = {
  registerCompleteRoute
}
