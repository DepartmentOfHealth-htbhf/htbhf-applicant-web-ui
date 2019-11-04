const { validateIsYesOrNo } = require('../common/validators')

const validate = () => [
  validateIsYesOrNo('scotland', 'validation:selectYesOrNoDoYouLiveInScotland')
]

module.exports = {
  validate
}
