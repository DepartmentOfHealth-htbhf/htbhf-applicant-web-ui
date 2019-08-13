const { path } = require('ramda')
const { YES } = require('../common/constants')
const { validate } = require('./validate')
const { getExampleDate } = require('../common/formatters')
const { setChildrenInSessionForGet, setChildrenInSessionForPost } = require('./set-children-in-session')
const { handleRemoveAction } = require('./handle-remove-action')
const { handleAddAction } = require('./handle-add-action')
const { PATH } = require('./constants')

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
  aboutYourChild: translate('childrenDob.aboutYourChild'),
  addChild: translate('buttons:addChild'),
  removeChild: translate('buttons:removeChild')
})

const isNavigable = (session) => path(['claim', 'doYouHaveChildren'], session) === YES

const behaviourForGet = (req, res, next) => {
  req = setChildrenInSessionForGet(req)
  res.locals.children = req.session.children
  next()
}

const behaviourForPost = [
  setChildrenInSessionForPost,
  handleAddAction,
  handleRemoveAction
]

const childrenDob = {
  path: PATH,
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
  childrenDob
}
