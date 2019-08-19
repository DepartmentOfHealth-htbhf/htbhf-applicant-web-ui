const { URLS } = require('../paths')

const iLiveInScotland = [
  {
    url: URLS['DO_YOU_LIVE_IN_SCOTLAND'],
    formData: () => ({
      scotland: 'yes'
    })
  },
  {
    url: URLS['I_LIVE_IN_SCOTLAND']
  }
]

module.exports = {
  iLiveInScotland
}
