const getPersonalDetails = (req, res) => {
  res.render('personal-details', { title: 'Personal details' })
}

module.exports = {
  getPersonalDetails
}
