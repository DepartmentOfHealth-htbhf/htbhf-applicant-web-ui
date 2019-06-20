const { validate } = require('./validate')
const { YES } = require('../common/constants')

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

const claimantLivesInScotland = claim => claim.doYouLiveInScotland === YES

const next = req => claimantLivesInScotland(req.session.claim) ? '/i-live-in-scotland' : '/enter-dob'

const doYouLiveInScotland = {
  path: '/do-you-live-in-scotland',
  next,
  shouldInvalidateReview: claimantLivesInScotland,
  template: 'do-you-live-in-scotland',
  pageContent,
  contentSummary,
  validate
}

module.exports = {
  doYouLiveInScotland
}
