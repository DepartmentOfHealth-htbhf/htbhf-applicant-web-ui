const pageContent = {
  title: 'Check your answers before sending your application',
  heading: 'Check your answers before sending your application'
}

const getCheck = (req, res) => {
  res.render('check', {
    ...pageContent,
    claim: req.session.claim,
    csrfToken: req.csrfToken()
  })
}

module.exports = {
  getCheck
}
