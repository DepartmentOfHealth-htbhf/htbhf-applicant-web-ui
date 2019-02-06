const { isNil } = require('ramda')
const { YES } = require('../are-you-pregnant/constants')
const { steps } = require('../steps')

const pageContent = ({ translate }) => ({
  title: translate('check.title'),
  heading: translate('check.heading'),
  sendApplicationHeader: translate('check.sendApplicationHeader'),
  sendApplicationText: translate('check.sendApplicationText'),
  buttonText: translate('buttons:acceptAndSend'),
  changeText: translate('check.change')
})

const buildCheckRowData = (translate, claim) => {
  return [
    buildNinoRow(translate, claim),
    buildDateOfBirthRow(translate, claim),
    buildAreYouPregnantRow(translate, claim),
    buildExpectedDeliveryDateRow(translate, claim),
    buildAddressRow(translate, claim)
  ].filter(row => !isNil(row))
}

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
  ].filter((line) => !isNilOrEmpty(line))
    .join('\n')
)

const isNilOrEmpty = (string) => (isNil(string) || string.length === 0)

const buildRowData = (heading, content) => [
  { text: heading },
  { text: content }
]

const getRowData = (req) => (step) => {
  const { contentSummary, path } = step

  // TO DO: remove this check and validate steps schema
  const fn = typeof contentSummary === 'function' ? contentSummary : () => {}

  return {
    ...fn(req),
    path
  }
}

const getCheck = (req, res) => {
  const checkRowData = steps.map(getRowData(req))

  res.render('check', {
    claim: req.session.claim,
    ...pageContent({ translate: req.t }),
    csrfToken: req.csrfToken(),
    checkRowData
  })
}

module.exports = {
  getCheck,
  buildNinoRow,
  buildDateOfBirthRow,
  buildAreYouPregnantRow,
  buildExpectedDeliveryDateRow,
  buildAddressRow,
  buildCheckRowData,
  isNilOrEmpty
}
