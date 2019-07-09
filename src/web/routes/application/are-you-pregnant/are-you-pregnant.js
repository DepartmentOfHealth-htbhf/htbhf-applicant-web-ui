const { validate } = require('./validate')
const { YES } = require('../common/constants')
const { formatDateForDisplay, getExampleDate } = require('../common/formatters')

const contentSummary = (req) => {
  const pregnantSummary = {
    key: req.t('areYouPregnant.summaryKey'),
    value: req.t(req.session.claim.areYouPregnant)
  }
  const dueDateSummary = {
    key: req.t('areYouPregnant.expectedDeliveryDateSummaryKey'),
    value: formatDateForDisplay(
      req.session.claim['expectedDeliveryDate-day'],
      req.session.claim['expectedDeliveryDate-month'],
      req.session.claim['expectedDeliveryDate-year']
    )
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
  expectedDeliveryDateHint: translate('areYouPregnant.expectedDeliveryDateHint', { exampleDate: getExampleDate({ monthOffset: 5 }) }),
  explanation: translate('areYouPregnant.explanation')
})

const areYouPregnant = {
  path: '/are-you-pregnant',
  next: () => '/enter-name',
  template: 'are-you-pregnant',
  pageContent,
  validate,
  contentSummary
}

module.exports = {
  areYouPregnant,
  contentSummary
}
