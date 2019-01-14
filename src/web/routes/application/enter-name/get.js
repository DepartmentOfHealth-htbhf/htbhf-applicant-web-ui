const pageContent = {
  title: 'What is your name?',
  heading: 'What is your name?',
  formDescription: 'Tell us your full legal name as it appears on your passport or other benefit claims.'
}

const getEnterName = (req, res) => {
  res.render('enter-name', {
    ...pageContent,
    csrfToken: req.csrfToken()
  })
}

module.exports = {
  getEnterName
}
