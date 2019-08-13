const pageContent = ({ translate }) => ({
  title: translate('postcode.title'),
  heading: translate('postcode.heading'),
  formDescription: translate('postcode.formDescription'),
  postcodeLabel: translate('postcode.postcodeLabel'),
  buttonText: translate('buttons:continue'),
  explanation: translate('postcode.explanation')
})

// TODO HTBHF-2060 replace hardcoded value with feature toggle function
const isNavigable = () => false

const postcode = {
  path: '/postcode',
  template: 'postcode',
  pageContent,
  isNavigable
}

module.exports = {
  postcode
}
