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
    buildAreYouPregnantRow(translate, claim),
    buildExpectedDeliveryDateRow(translate, claim),
  ].filter(row => !isNil(row))
}

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
  buildAreYouPregnantRow,
  buildExpectedDeliveryDateRow,
  buildCheckRowData
}
