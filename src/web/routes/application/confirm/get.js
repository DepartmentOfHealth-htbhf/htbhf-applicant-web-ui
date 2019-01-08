const { pick } = require('ramda')

const getConfirm = (req, res) => {
  res.render('confirm', {
    title: 'Confirm',
    claim: pick(['firstName', 'lastName'], req.session.body),
    csrfToken: req.csrfToken()
  })
}

module.exports = {
  getConfirm
}
