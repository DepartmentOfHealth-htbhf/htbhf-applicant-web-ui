const { validate } = require('./validate')

const contentSummary = (req) => ({
  key: req.t('doYouHaveChildrenThreeOrYounger.summaryKey'),
  value: req.t(req.session.claim.doYouHaveChildrenThreeOrYounger)
})

const pageContent = ({ translate }) => ({
  title: translate('doYouHaveChildrenThreeOrYounger.title'),
  heading: translate('doYouHaveChildrenThreeOrYounger.heading'),
  buttonText: translate('buttons:continue'),
  yes: translate('yes'),
  no: translate('no'),
  explanation: translate('doYouHaveChildrenThreeOrYounger.explanation')
})

// Update to check response and direct to children dob page if the user selected yes.
const next = () => '/are-you-pregnant'

const doYouHaveChildrenThreeOrYounger = {
  path: '/do-you-have-children-three-or-younger',
  next,
  template: 'do-you-have-children-three-or-younger',
  pageContent,
  contentSummary,
  validate
}

module.exports = {
  doYouHaveChildrenThreeOrYounger
}
