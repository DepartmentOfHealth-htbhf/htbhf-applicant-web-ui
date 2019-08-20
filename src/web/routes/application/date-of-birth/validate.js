const { check } = require('express-validator')
const { toDateString } = require('../common/formatters')
const { isValidDate, isDateInPast } = require('../common/validators')

const addDateToBody = (req, res, next) => {
  req.body.dateOfBirth = toDateString(
    req.body['dateOfBirth-day'],
    req.body['dateOfBirth-month'],
    req.body['dateOfBirth-year']
  )
  next()
}

const validateDateOfBirth = (dob, { req }) => {
  if (!isValidDate(dob)) {
    throw new Error(req.t('validation:dateOfBirthInvalid'))
  }
  if (!isDateInPast(dob)) {
    throw new Error(req.t('validation:dateOfBirthInPast'))
  }
  return true
}

const validate = [
  addDateToBody,
  check('dateOfBirth').custom(validateDateOfBirth)
]

module.exports = {
  validateDateOfBirth,
  validate
}
