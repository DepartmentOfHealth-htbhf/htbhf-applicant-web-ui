const { path } = require('ramda')
const { YES } = require('../common/constants')

const pageContent = ({ translate }) => ({
  title: translate('iLiveInScotland.title'),
  heading: translate('iLiveInScotland.heading')
})

const isNavigable = (session) => path(['claim', 'doYouLiveInScotland'], session) === YES

const iLiveInScotland = {
  path: '/i-live-in-scotland',
  template: 'i-live-in-scotland',
  pageContent,
  isNavigable
}

module.exports = {
  iLiveInScotland
}
