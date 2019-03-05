const pageContent = ({ translate }) => ({
  title: translate('pageNotFound.title'),
  heading: translate('pageNotFound.heading'),
  checkTypedAddress: translate('pageNotFound.checkTypedAddress'),
  checkPastedAddress: translate('pageNotFound.checkPastedAddress')
})

const registerPageNotFoundRoute = (app) => {
  app.all('*', (req, res) => {
    res.status(404).render('page-not-found', pageContent({ translate: req.t }))
  })
}

module.exports = {
  registerPageNotFoundRoute
}
