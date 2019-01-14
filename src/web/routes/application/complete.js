const pageContent = {
  title: 'Application successful',
  heading: 'Application successful'
}

const getCompletePage = (req, res) => {
  res.render('complete', pageContent)
}

const registerCompleteRoute = (app) => {
  app.get('/complete', getCompletePage)
}

module.exports = {
  registerCompleteRoute
}
