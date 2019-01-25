const { check } = require('express-validator/check')

const validate = [
  check('areYouPregnant').isIn(['yes', 'no']).withMessage((value, { req }) => req.t('validation:selectYesOrNo', { value }))
]

module.exports = {
  validate
}
