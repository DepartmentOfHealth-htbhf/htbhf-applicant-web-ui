const pageContent = ({ translate }) => ({
  title: translate('areYouPregnant.title'),
  heading: translate('areYouPregnant.heading'),
  areYouPregnantLabel: translate('areYouPregnant.areYouPregnantLabel'),
  hint: translate('areYouPregnant.hint'),
  buttonText: translate('buttons:continue'),
  yes: translate('common:yes'),
  no: translate('common:no')
})

const areYouPregnant = {
  path: '/are-you-pregnant',
  next: '/check',
  template: 'are-you-pregnant',
  pageContent
}

module.exports = {
  areYouPregnant
}
