const { pick } = require('ramda')

const pageContent = {
  title: 'Confirm',
  heading: 'Confirm'
}

const getConfirm = (req, res) => {
  res.render('confirm', {
    ...pageContent,
    claim: pick(['firstName', 'lastName', 'nino'], req.session.claim),
    csrfToken: req.csrfToken()
  })
}

module.exports = {
  getConfirm
}
