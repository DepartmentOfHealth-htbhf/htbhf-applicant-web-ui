const pageContent = ({ translate }) => ({
  title: translate('page-not-found.title'),
  heading: translate('page-not-found.heading'),
  'checkTypedAddress': translate('page-not-found.checkTypedAddress'),
  'checkPastedAddress': translate('page-not-found.checkPastedAddress')
})

const registerPageNotFoundRoute = (app) => {
  app.all('*', (req, res) => {
    res.status(404).render('page-not-found', pageContent({ translate: req.t }))
  })
}

module.exports = {
  registerPageNotFoundRoute
}
