const { pickBy, path } = require('ramda')
const { countKeysContainingString } = require('./count-keys')
const { YES } = require('../common/constants')
const { validate } = require('./validate')
const { getExampleDate } = require('../common/formatters')

const PATH = '/children-dob'
const DAY_FIELD_SUFFIX = '-day'

const pageContent = ({ translate }) => ({
  title: translate('childrenDob.title'),
  heading: translate('childrenDob.heading'),
  hint: translate('childrenDob.hint', { exampleDate: getExampleDate({ yearOffset: -2 }) }),
  buttonText: translate('buttons:continue'),
  dayLabel: translate('childrenDob.dayLabel'),
  monthLabel: translate('childrenDob.monthLabel'),
  yearLabel: translate('childrenDob.yearLabel'),
  explanation: translate('childrenDob.explanation'),
  nameLabel: translate('childrenDob.nameLabel'),
  dateOfBirth: translate('childrenDob.dateOfBirth'),
  aboutYourChild: translate('childrenDob.aboutYourChild')
})

const addActionRequested = body => body.hasOwnProperty('add')

const extractChildrenEntries = (val, key) => key.startsWith('child')

const initialiseChildrenInSession = (req) => {
  if (!req.session.hasOwnProperty('children')) {
    req.session.children = {
      inputCount: 1,
      childCount: 0
    }
  }

  return req
}

const isNavigable = (session) => path(['claim', 'doYouHaveChildrenThreeOrYounger'], session) === YES

const behaviourForGet = (req, res, next) => {
  req = initialiseChildrenInSession(req)
  res.locals.children = req.session.children
  next()
}

const behaviourForPost = (req, res, next) => {
  const childCount = countKeysContainingString(DAY_FIELD_SUFFIX, req.body)

  req.session.children = {
    ...pickBy(extractChildrenEntries, req.body),
    inputCount: childCount,
    childCount: childCount
  }

  // GET behaviour is not called on validation error so locals also need setting for POST
  res.locals.children = req.session.children

  if (addActionRequested(req.body)) {
    const updatedCount = req.session.children.inputCount + 1
    req.session.children.inputCount = updatedCount
    return res.redirect(PATH)
  }

  next()
}

const childrenDob = {
  path: PATH,
  next: () => '/are-you-pregnant',
  template: 'children-dob',
  pageContent,
  isNavigable,
  behaviourForGet,
  behaviourForPost,
  validate
}

module.exports = {
  behaviourForGet,
  behaviourForPost,
  childrenDob,
  countKeysContainingString
}
