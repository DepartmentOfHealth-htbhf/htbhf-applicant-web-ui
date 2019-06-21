const { validateIsYesOrNo } = require('../common/validators')

const validate = [
  validateIsYesOrNo('doYouLiveInScotland', 'validation:selectYesOrNoDoYouLiveInScotland')
]

module.exports = {
  validate
}
