const { validateIsYesOrNo } = require('../common/validators')

const validate = [
  validateIsYesOrNo('doYouHaveChildrenThreeOrYounger', 'validation:selectYesOrNoDoYouHaveChildrenThreeOrYounger')
]

module.exports = {
  validate
}
