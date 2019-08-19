const { validate } = require('./validate')
const { YES, NO } = require('../common/constants')

const pageContent = ({ translate }) => ({
  title: translate('doYouHaveChildren.title'),
  heading: translate('doYouHaveChildren.heading'),
  buttonText: translate('buttons:continue'),
  yes: translate('yes'),
  no: translate('no'),
  explanation: translate('doYouHaveChildren.explanation'),
  formDescription: translate('doYouHaveChildren.formDescription')
})

const next = req => req.session.claim.doYouHaveChildren === YES ? '/children-dob' : '/are-you-pregnant'

const contentSummary = (req) => ({
  list: 'aboutYourChildren',
  key: req.t('doYouHaveChildren.summaryKey'),
  value: req.t(req.session.claim.doYouHaveChildren)
})

const claimantHasChildren = claim => claim.doYouHaveChildren === YES

const behaviourForPost = (req, res, next) => {
  if (req.body.doYouHaveChildren === NO) {
    req.session.children = null
  }

  next()
}

const doYouHaveChildren = {
  path: '/do-you-have-children',
  next,
  template: 'do-you-have-children',
  pageContent,
  validate,
  contentSummary,
  shouldInvalidateReview: claimantHasChildren,
  behaviourForPost
}

module.exports = {
  doYouHaveChildren,
  behaviourForPost
}
