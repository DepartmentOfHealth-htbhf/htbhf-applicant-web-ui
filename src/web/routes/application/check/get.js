const { YES } = require('../are-you-pregnant/constants')
const { isNil } = require('ramda')
const { formatDateForDisplay } = require('../common/formatters')

const pageContent = ({ translate }) => ({
  title: translate('check.title'),
  heading: translate('check.heading'),
  sendApplicationHeader: translate('check.sendApplicationHeader'),
  sendApplicationText: translate('check.sendApplicationText'),
  buttonText: translate('buttons:acceptAndSend')
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

const buildDateOfBirthRow = (translate, claim) => {
  const formattedDate = formatDateForDisplay(
    claim['dateOfBirth-day'],
    claim['dateOfBirth-month'],
    claim['dateOfBirth-year']
  )
  return buildRowData(translate('check.dateOfBirth'), formattedDate)
}

const buildAreYouPregnantRow = (translate, claim) => buildRowData(
  translate('check.areYouPregnant'),
  translate(claim.areYouPregnant)
)

const buildExpectedDeliveryDateRow = (translate, claim) => {
  if (claim.areYouPregnant === YES) {
    const formattedDate = formatDateForDisplay(
      claim['expectedDeliveryDate-day'],
      claim['expectedDeliveryDate-month'],
      claim['expectedDeliveryDate-year']
    )
    return buildRowData(translate('check.dueDate'), formattedDate)
  }
}

const buildAddressRow = (translate, claim) => buildRowData(
  translate('check.address'),
  [
    claim.addressLine1,
    claim.addressLine2,
    claim.townOrCity,
    claim.postcode
  ].filter((line) => !isNilOrEmpty(line))
    .join('\n')
)

const isNilOrEmpty = (string) => (isNil(string) || string.length === 0)

const buildRowData = (heading, content) => [
  { text: heading },
  { text: content }
]

const getCheck = (req, res) => {
  res.render('check', {
    claim: req.session.claim,
    ...pageContent({ translate: req.t }),
    csrfToken: req.csrfToken(),
    checkRowData: buildCheckRowData(req.t, req.session.claim)
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
  buildCheckRowData,
  isNilOrEmpty
}
