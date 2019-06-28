const { pickBy } = require('ramda')

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

const behaviourForGet = (req, res, next) => {
  if (!req.session.hasOwnProperty('children')) {
    req.session.children = {}
  }

  req.session.children.count = 1

  res.locals.children = req.session.children
  next()
}

const extractChildrenEntries = (val, key) => key.startsWith('children')

const behaviourForPost = (req, res, next) => {
  if (req.body.hasOwnProperty('add')) {
    req.session.children = pickBy(extractChildrenEntries, req.body)
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
  childrenDob
}
