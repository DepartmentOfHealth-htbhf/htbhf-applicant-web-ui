const { pick } = require('ramda')

const pageContent = {
  title: 'Check',
  heading: 'Check'
}

const getCheck = (req, res) => {
  res.render('check', {
    ...pageContent,
    claim: pick(['firstName', 'lastName', 'nino'], req.session.claim),
    csrfToken: req.csrfToken()
  })
}

module.exports = {
  getCheck
}
