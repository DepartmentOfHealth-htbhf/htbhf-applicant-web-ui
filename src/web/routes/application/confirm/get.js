const { pick } = require('ramda')

const getConfirm = (req, res) => {
  res.render('confirm', {
    title: 'Confirm',
    claim: pick(['firstName', 'lastName'], req.session.body)
  })
}

module.exports = {
  getConfirm
}
