const { validate } = require('./validate')

const exampleDate = (fromDate = new Date()) => {
  const future = new Date(fromDate)
  future.setDate(28)
  future.setMonth(future.getMonth() + 5)
  return `${future.getDate()} ${future.getMonth() + 1} ${future.getFullYear()}`
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
  validate
}

module.exports = {
  areYouPregnant,
  exampleDate
}
