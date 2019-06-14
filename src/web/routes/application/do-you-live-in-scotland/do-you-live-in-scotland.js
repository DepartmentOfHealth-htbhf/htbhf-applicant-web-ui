const { validate } = require('./validate')

const contentSummary = (req) => ({
  key: req.t('doYouLiveInScotland.summaryKey'),
  value: req.t(req.session.claim.doYouLiveInScotland)
})

const pageContent = ({ translate }) => ({
  title: translate('doYouLiveInScotland.title'),
  heading: translate('doYouLiveInScotland.heading'),
  buttonText: translate('buttons:continue'),
  yes: translate('yes'),
  no: translate('no')
})

const doYouLiveInScotland = {
  path: '/do-you-live-in-scotland',
  next: () => '/enter-dob',
  template: 'do-you-live-in-scotland',
  pageContent,
  contentSummary,
  validate
}

module.exports = {
  doYouLiveInScotland
}
