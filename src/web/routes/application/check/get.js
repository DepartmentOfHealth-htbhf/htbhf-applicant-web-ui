const pageContent = ({ translate }) => ({
  title: translate('check.title'),
  heading: translate('check.heading'),
  name: translate('check.name'),
  nino: translate('check.nationalInsuranceNumber'),
  dateOfBirth: translate('check.dateOfBirth'),
  areYouPregnant: translate('check.areYouPregnant'),
  dueDate: translate('check.dueDate'),
  address: translate('check.address'),
  sendApplicationHeader: translate('check.sendApplicationHeader'),
  sendApplicationText: translate('check.sendApplicationText'),
  buttonText: translate('check.buttonText')
})

const getCheck = (req, res) => {
  res.render('check', {
    ...pageContent({ translate: req.t }),
    claim: req.session.claim,
    csrfToken: req.csrfToken()
  })
}

module.exports = {
  getCheck
}
