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

const addActionRequested = body => body.hasOwnProperty('add')

const extractChildrenEntries = (val, key) => key.startsWith('child')

const initialiseChildrenInSession = (req) => {
  if (!req.session.hasOwnProperty('children')) {
    req.session.children = {
      count: 0
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
  req = initialiseChildrenInSession(req)

  if (addActionRequested(req.body)) {
    req.session.children = {
      ...pickBy(extractChildrenEntries, req.body),
      count: req.session.children.count += 1
    }

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
