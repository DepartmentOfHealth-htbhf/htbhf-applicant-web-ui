const { validateIsYesOrNo } = require('../common/validators')

const validate = [
  validateIsYesOrNo('doYouHaveChildrenThreeOrUnder', 'validation:selectYesOrNoDoYouHaveChildrenThreeOrUnder')
]

module.exports = {
  validate
}
