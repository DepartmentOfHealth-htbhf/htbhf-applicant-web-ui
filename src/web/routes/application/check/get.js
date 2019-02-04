const { YES } = require('../are-you-pregnant/constants')
const { isNil } = require('ramda')

const pageContent = ({ translate, claim }) => ({
  title: translate('check.title'),
  heading: translate('check.heading'),
  sendApplicationHeader: translate('check.sendApplicationHeader'),
  sendApplicationText: translate('check.sendApplicationText'),
  buttonText: translate('buttons:acceptAndSend'),
  checkRowData: buildCheckRowData(translate, claim)
})

const buildCheckRowData = (translate, claim) => {
  return [
    buildNameRow(translate, claim),
    buildNinoRow(translate, claim),
    buildDateOfBirthRow(translate, claim),
    buildAreYouPregnantRow(translate, claim),
    buildExpectedDeliveryDateRow(translate, claim),
    buildAddressRow(translate, claim)
  ].filter(row => !isNil(row))
}

const buildNameRow = (translate, claim) => buildRowData(
  translate('check.name'),
  [claim.firstName, claim.lastName].join(' ')
)

const buildNinoRow = (translate, claim) => buildRowData(
  translate('check.nationalInsuranceNumber'),
  claim.nino
)

const buildDateOfBirthRow = (translate, claim) => buildRowData(
  translate('check.dateOfBirth'),
  [claim['dateOfBirth-day'], claim['dateOfBirth-month'], claim['dateOfBirth-year']].join(' ')
)

const buildAreYouPregnantRow = (translate, claim) => buildRowData(
  translate('check.areYouPregnant'),
  translate(claim.areYouPregnant)
)

const buildExpectedDeliveryDateRow = (translate, claim) => {
  if (claim.areYouPregnant === YES) {
    return buildRowData(
      translate('check.dueDate'),
      [claim['expectedDeliveryDate-day'], claim['expectedDeliveryDate-month'], claim['expectedDeliveryDate-year']].join(' ')
    )
  }
}

const buildAddressRow = (translate, claim) => buildRowData(
  translate('check.address'),
  [
    claim.addressLine1,
    claim.addressLine2,
    claim.townOrCity,
    claim.postcode
  ].filter(item => (item !== undefined && item.length !== 0))
    .join('<br/>')
)

const buildRowData = (heading, content) => [
  { text: heading },
  { text: content }
]

const getCheck = (req, res) => {
  res.render('check', {
    claim: req.session.claim,
    ...pageContent({ translate: req.t, claim: req.session.claim }),
    csrfToken: req.csrfToken()
  })
}

module.exports = {
  getCheck,
  buildNameRow,
  buildNinoRow,
  buildDateOfBirthRow,
  buildAreYouPregnantRow,
  buildExpectedDeliveryDateRow,
  buildAddressRow,
  buildCheckRowData
}
