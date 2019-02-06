const { validate } = require('./validate')
const { YES } = require('../constants')

const exampleDate = (fromDate = new Date()) => {
  const future = new Date(fromDate)
  future.setDate(28)
  future.setMonth(future.getMonth() + 5)
  return `${future.getDate()} ${future.getMonth() + 1} ${future.getFullYear()}`
}

const contentSummary = (req) => {
  const pregnantSummary = {
    key: req.t('areYouPregnant.summaryKey'),
    value: req.t(req.session.claim.areYouPregnant)
  }
  const dueDateSummary = {
    key: req.t('areYouPregnant.expectedDeliveryDateSummaryKey'),
    value: [
      req.session.claim['expectedDeliveryDate-day'],
      req.session.claim['expectedDeliveryDate-month'],
      req.session.claim['expectedDeliveryDate-year']
    ].join(' ')
  }
  if (req.session.claim.areYouPregnant === YES) {
    return [pregnantSummary, dueDateSummary]
  }
  return pregnantSummary
}

const pageContent = ({ translate }) => ({
  title: translate('areYouPregnant.title'),
  heading: translate('areYouPregnant.heading'),
  areYouPregnantLabel: translate('areYouPregnant.areYouPregnantLabel'),
  buttonText: translate('buttons:continue'),
  yes: translate('yes'),
  no: translate('no'),
  expectedDeliveryDateText: translate('areYouPregnant.expectedDeliveryDateText'),
  expectedDeliveryDateHint: translate('areYouPregnant.expectedDeliveryDateHint', { exampleDate: exampleDate() })
})

const areYouPregnant = {
  path: '/are-you-pregnant',
  next: '/card-address',
  template: 'are-you-pregnant',
  pageContent,
  validate,
  contentSummary
}

module.exports = {
  areYouPregnant,
  exampleDate,
  contentSummary
}
