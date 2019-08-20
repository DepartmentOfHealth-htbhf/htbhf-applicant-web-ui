const { validateIsYesOrNo } = require('../common/validators')

const validate = () => [
  validateIsYesOrNo('doYouHaveChildren', 'validation:selectYesOrNoDoYouHaveChildren')
]

module.exports = {
  validate
}
