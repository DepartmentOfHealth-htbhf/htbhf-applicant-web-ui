const { URLS } = require('../paths')
const { NHS_NUMBER } = require('../constants')

const nhsNumber = [
  {
    url: URLS['WHAT_IS_YOUR_NHS_NUMBER'],
    formData: () => ({
      nhsNumber: NHS_NUMBER
    })
  }
]

module.exports = {
  nhsNumber
}
