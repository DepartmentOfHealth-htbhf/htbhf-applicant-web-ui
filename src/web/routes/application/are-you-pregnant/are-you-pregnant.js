const { validate } = require('./validate')

const pageContent = ({ translate }) => ({
  title: translate('areYouPregnant.title'),
  heading: translate('areYouPregnant.heading'),
  areYouPregnantLabel: translate('areYouPregnant.areYouPregnantLabel'),
  buttonText: translate('buttons:continue'),
  yes: translate('yes'),
  no: translate('no')
})

const areYouPregnant = {
  path: '/are-you-pregnant',
  next: '/check',
  template: 'are-you-pregnant',
  pageContent,
  validate
}

module.exports = {
  areYouPregnant
}
