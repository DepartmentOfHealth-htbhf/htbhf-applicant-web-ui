const { pick } = require('ramda')

const getConfirm = (req, res) => {
  res.render('confirm', {
    heading: 'Confirm',
    claim: pick(['firstName', 'lastName'], req.session.claim),
    csrfToken: req.csrfToken()
  })
}

module.exports = {
  getConfirm
}
