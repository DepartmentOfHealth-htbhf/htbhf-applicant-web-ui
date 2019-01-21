const pageContent = {
  title: 'Check',
  heading: 'Check'
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
