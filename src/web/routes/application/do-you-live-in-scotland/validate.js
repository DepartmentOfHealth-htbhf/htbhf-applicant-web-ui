const { validateIsYesOrNo } = require('../common/validators')

const validate = [
  validateIsYesOrNo('doYouLiveInScotland')
]

module.exports = {
  validate
}
