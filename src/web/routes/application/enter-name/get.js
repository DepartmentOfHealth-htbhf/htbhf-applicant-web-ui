const getEnterName = (req, res) => {
  res.render('enter-name', {
    heading: 'What is your name?',
    formDescription: 'Tell us your full legal name as it appears on your passport or other benefit claims.',
    csrfToken: req.csrfToken()
  })
}

module.exports = {
  getEnterName
}
