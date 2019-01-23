const { isNil } = require('ramda')
const { check } = require('express-validator/check')

const nilToString = (value) => isNil(value) ? '' : value

const toDateString = (day, month, year) => {
  const parseDay = nilToString(day).padStart(2, '0')
  const parseMonth = nilToString(month).padStart(2, '0')

  return [year, parseMonth, parseDay].join('-')
}

const addDateToBody = (req, res, next) => {
  req.body.dateOfBirth = toDateString(
    req.body['dateOfBirth-day'],
    req.body['dateOfBirth-month'],
    req.body['dateOfBirth-year']
  )
  next()
}

const validate = [
  addDateToBody,
  check('dateOfBirth').isISO8601().withMessage((value, { req }) => req.t('validation:dobInvalid', { value }))
]

module.exports = {
  toDateString,
  validate
}
