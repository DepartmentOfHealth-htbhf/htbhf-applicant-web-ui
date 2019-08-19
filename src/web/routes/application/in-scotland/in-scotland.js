const { path } = require('ramda')
const { YES } = require('../common/constants')

const pageContent = ({ translate }) => ({
  title: translate('inScotland.title'),
  heading: translate('inScotland.heading')
})

const isNavigable = (session) => path(['claim', 'scotland'], session) === YES

const behaviourForGet = (req, res, next) => {
  req.session.destroy()
  res.clearCookie('lang')
  next()
}

const inScotland = {
  path: '/in-scotland',
  template: 'in-scotland',
  pageContent,
  isNavigable,
  behaviourForGet
}

module.exports = {
  iLiveInScotland: inScotland
}
