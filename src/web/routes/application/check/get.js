const { YES } = require('../are-you-pregnant/constants')

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
  ].filter(row => row !== undefined)
}

const buildNameRow = (translate, claim) => {
  return buildRowData(
    translate('check.name'),
    [claim.firstName, claim.lastName].join(' ')
  )
}

const buildNinoRow = (translate, claim) => {
  return buildRowData(
    translate('check.nationalInsuranceNumber'),
    claim.nino
  )
}

const buildDateOfBirthRow = (translate, claim) => {
  return buildRowData(
    translate('check.dateOfBirth'),
    [claim['dateOfBirth-day'], claim['dateOfBirth-month'], claim['dateOfBirth-year']].join(' ')
  )
}

const buildAreYouPregnantRow = (translate, claim) => {
  return buildRowData(
    translate('check.areYouPregnant'),
    claim.areYouPregnant
  )
}

const buildExpectedDeliveryDateRow = (translate, claim) => {
  if (claim.areYouPregnant === YES) {
    return buildRowData(
      translate('check.dueDate'),
      [claim['expectedDeliveryDate-day'], claim['expectedDeliveryDate-month'], claim['expectedDeliveryDate-year']].join(' ')
    )
  }
}

// We need to build up this row here because we cannot dynamically hide a using the govukTable component based on session data.
const buildAddressRow = (translate, claim) => {
  return buildRowData(
    translate('check.address'),
    [
      claim.addressLine1,
      claim.addressLine2,
      claim.townOrCity,
      claim.postcode
    ].filter(item => (item !== undefined && item.length !== 0))
      .join('<br/>')
  )
}

const buildRowData = (heading, content) => {
  return [
    {
      text: heading
    },
    {
      text: content
    }
  ]
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
