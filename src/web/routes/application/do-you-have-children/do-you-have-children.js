const { validate } = require('./validate')
const { YES, NO } = require('../common/constants')

const pageContent = ({ translate }) => ({
  title: translate('doYouHaveChildrenThreeOrYounger.title'),
  heading: translate('doYouHaveChildrenThreeOrYounger.heading'),
  buttonText: translate('buttons:continue'),
  yes: translate('yes'),
  no: translate('no'),
  explanation: translate('doYouHaveChildrenThreeOrYounger.explanation')
})

const next = req => req.session.claim.doYouHaveChildrenThreeOrYounger === YES ? '/children-dob' : '/are-you-pregnant'

const contentSummary = (req) => ({
  list: 'aboutYourChildren',
  key: req.t('doYouHaveChildrenThreeOrYounger.summaryKey'),
  value: req.t(req.session.claim.doYouHaveChildrenThreeOrYounger)
})

const claimantHasChildren = claim => claim.doYouHaveChildrenThreeOrYounger === YES

const behaviourForPost = (req, res, next) => {
  if (req.body.doYouHaveChildrenThreeOrYounger === NO) {
    req.session.children = null
  }

  next()
}

const doYouHaveChildrenThreeOrYounger = {
  path: '/do-you-have-children-three-or-younger',
  next,
  template: 'do-you-have-children',
  pageContent,
  validate,
  contentSummary,
  shouldInvalidateReview: claimantHasChildren,
  behaviourForPost
}

module.exports = {
  doYouHaveChildrenThreeOrYounger,
  behaviourForPost
}
