const { YES } = require('../common/constants')

const pageContent = ({ translate }) => ({
  title: translate('iLiveInScotland.title'),
  heading: translate('iLiveInScotland.heading')
})

const isNavigable = (session) => session.claim.doYouLiveInScotland === YES

const iLiveInScotland = {
  path: '/i-live-in-scotland',
  template: 'i-live-in-scotland',
  pageContent,
  isNavigable
}

module.exports = {
  iLiveInScotland
}
