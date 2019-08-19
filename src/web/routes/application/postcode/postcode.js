const pageContent = ({ translate }) => ({
  title: translate('postcode.title'),
  heading: translate('postcode.heading'),
  formDescription: translate('postcode.formDescription'),
  postcodeLabel: translate('postcode.postcodeLabel'),
  buttonText: translate('buttons:continue'),
  explanation: translate('postcode.explanation')
})

const postcode = {
  path: '/postcode',
  template: 'postcode',
  pageContent,
  toggle: 'ADDRESS_LOOKUP_ENABLED'
}

module.exports = {
  postcode
}
