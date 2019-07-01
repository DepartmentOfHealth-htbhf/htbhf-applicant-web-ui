const { pickBy } = require('ramda')
const { countKeysContainingString } = require('./count-keys')

const PATH = '/children-dob'

const pageContent = ({ translate }) => ({
  title: translate('childrenDob.title'),
  heading: translate('childrenDob.heading'),
  hint: translate('childrenDob.hint'),
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
      // TODO HTBHF-1678 review if `childCount` is required for validation, else remove
      childCount: 0
    }
  }

  return req
}

const behaviourForGet = (req, res, next) => {
  req = initialiseChildrenInSession(req)
  res.locals.children = req.session.children
  next()
}

const behaviourForPost = (req, res, next) => {
  const childCount = countKeysContainingString('day', req.body)

  req.session.children = {
    ...pickBy(extractChildrenEntries, req.body),
    inputCount: childCount,
    childCount: childCount
  }

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
  behaviourForGet,
  behaviourForPost
}

module.exports = {
  behaviourForGet,
  behaviourForPost,
  childrenDob,
  countKeysContainingString
}
