const { validate } = require('./validate')

const pageContent = ({ translate }) => ({
  title: translate('areYouPregnant.title'),
  heading: translate('areYouPregnant.heading'),
  areYouPregnantLabel: translate('areYouPregnant.areYouPregnantLabel'),
  buttonText: translate('buttons:continue'),
  yes: translate('yes'),
  no: translate('no'),
  expectedDeliveryDateText: translate('areYouPregnant.expectedDeliveryDateText'),
  expectedDeliveryDateHint: translate('areYouPregnant.expectedDeliveryDateHint')
})

const areYouPregnant = {
  path: '/are-you-pregnant',
  next: '/card-address',
  template: 'are-you-pregnant',
  pageContent,
  validate
}

module.exports = {
  areYouPregnant
}
