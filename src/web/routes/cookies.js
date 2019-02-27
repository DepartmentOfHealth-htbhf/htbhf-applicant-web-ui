const pageContent = ({ translate }) => ({
  title: translate('cookies.title')
})

const getCookiesPage = (req, res) => {
  res.render('cookies', {
    ...pageContent({ translate: req.t }),
    previous: req.header('referer')
  })
}

const registerCookiesRoute = (app) => {
  app.get('/cookies', getCookiesPage)
}

module.exports = {
  registerCookiesRoute
}
