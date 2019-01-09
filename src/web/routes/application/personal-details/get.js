const getPersonalDetails = (req, res) => {
  res.render('personal-details', {
    title: 'Personal details',
    csrfToken: req.csrfToken()
  })
}

module.exports = {
  getPersonalDetails
}
