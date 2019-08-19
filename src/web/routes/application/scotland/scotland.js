const { validate } = require('./validate')
const { YES } = require('../common/constants')

const contentSummary = (req) => ({
  key: req.t('scotland.summaryKey'),
  value: req.t(req.session.claim.scotland)
})

const pageContent = ({ translate }) => ({
  title: translate('scotland.title'),
  heading: translate('scotland.heading'),
  buttonText: translate('buttons:continue'),
  yes: translate('yes'),
  no: translate('no')
})

const claimantLivesInScotland = claim => claim.scotland === YES

const next = req => claimantLivesInScotland(req.session.claim) ? '/in-scotland' : '/enter-dob'

const scotland = {
  path: '/scotland',
  next,
  shouldInvalidateReview: claimantLivesInScotland,
  template: 'scotland',
  pageContent,
  contentSummary,
  validate
}

module.exports = {
  scotland: scotland
}
