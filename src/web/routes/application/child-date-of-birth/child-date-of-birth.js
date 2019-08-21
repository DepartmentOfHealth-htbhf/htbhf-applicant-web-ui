const { path } = require('ramda')
const { YES } = require('../common/constants')
const { validate } = require('./validate')
const { getExampleDate } = require('../common/formatters')
const { setChildrenInSessionForGet, setChildrenInSessionForPost } = require('./set-children-in-session')
const { handleRemoveAction } = require('./handle-remove-action')
const { handleAddAction } = require('./handle-add-action')
const { PATH } = require('./constants')

const pageContent = ({ translate }) => ({
  title: translate('childDateOfBirth.title'),
  heading: translate('childDateOfBirth.heading'),
  hint: translate('childDateOfBirth.hint', { exampleDate: getExampleDate({ yearOffset: -2 }) }),
  buttonText: translate('buttons:continue'),
  dayLabel: translate('childDateOfBirth.dayLabel'),
  monthLabel: translate('childDateOfBirth.monthLabel'),
  yearLabel: translate('childDateOfBirth.yearLabel'),
  explanation: translate('childDateOfBirth.explanation'),
  nameLabel: translate('childDateOfBirth.nameLabel'),
  dateOfBirth: translate('childDateOfBirth.dateOfBirth'),
  aboutYourChild: translate('childDateOfBirth.aboutYourChild'),
  addChild: translate('buttons:addChild'),
  removeChild: translate('buttons:removeChild')
})

const isNavigable = (session) => path(['claim', 'doYouHaveChildren'], session) === YES

const behaviourForGet = () => (req, res, next) => {
  req = setChildrenInSessionForGet(req)
  res.locals.children = req.session.children
  next()
}

const behaviourForPost = () => [
  setChildrenInSessionForPost,
  handleAddAction,
  handleRemoveAction
]

const childDateOfBirth = {
  path: PATH,
  template: 'child-date-of-birth',
  pageContent,
  isNavigable,
  behaviourForGet,
  behaviourForPost,
  validate
}

module.exports = {
  behaviourForGet,
  behaviourForPost,
  childDateOfBirth
}
