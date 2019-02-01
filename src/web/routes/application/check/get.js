const { YES } = require('../are-you-pregnant/constants')

const pageContent = ({ translate, claim }) => ({
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
  buttonText: translate('check.buttonText'),
  expectedDeliveryDateRow: buildExpectedDeliveryDateRow(translate, claim)
})

// We need to build up this row here because we cannot dynamically hide a using the govukTable component based on session data.
const buildExpectedDeliveryDateRow = (translate, claim) => {
  if (claim.areYouPregnant === YES) {
    return [
      {
        text: translate('check.dueDate')
      },
      {
        text: [claim['expectedDeliveryDate-day'], claim['expectedDeliveryDate-month'], claim['expectedDeliveryDate-year']].join(' ')
      }
    ]
  }
}

const getCheck = (req, res) => {
  res.render('check', {
    claim: req.session.claim,
    ...pageContent({ translate: req.t, claim: req.session.claim }),
    csrfToken: req.csrfToken()
  })
}

module.exports = {
  getCheck
}
