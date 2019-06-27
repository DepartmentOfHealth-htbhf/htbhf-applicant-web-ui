const { validate } = require('./validate')
const { YES } = require('../common/constants')

const pageContent = ({ translate }) => ({
  title: translate('doYouHaveChildrenThreeOrYounger.title'),
  heading: translate('doYouHaveChildrenThreeOrYounger.heading'),
  buttonText: translate('buttons:continue'),
  yes: translate('yes'),
  no: translate('no'),
  explanation: translate('doYouHaveChildrenThreeOrYounger.explanation')
})

const next = req => req.session.claim.doYouHaveChildrenThreeOrYounger === YES ? '/children-dob' : '/are-you-pregnant'

const doYouHaveChildrenThreeOrYounger = {
  path: '/do-you-have-children-three-or-younger',
  next,
  template: 'do-you-have-children-three-or-younger',
  pageContent,
  validate
}

module.exports = {
  doYouHaveChildrenThreeOrYounger
}
