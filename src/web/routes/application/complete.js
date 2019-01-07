const getCompletePage = (req, res) => {
  res.render('complete', { title: 'Application successful' })
}

const registerCompleteRoute = (app) => {
  app.get('/complete', getCompletePage)
}

module.exports = {
  registerCompleteRoute
}
