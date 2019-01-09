const getCompletePage = (req, res) => {
  res.render('complete', { heading: 'Application successful' })
}

const registerCompleteRoute = (app) => {
  app.get('/complete', getCompletePage)
}

module.exports = {
  registerCompleteRoute
}
