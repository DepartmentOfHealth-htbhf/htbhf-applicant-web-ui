const { check } = require('express-validator')
const { compose, keys, any, startsWith } = require('ramda')
const { toDateString } = require('../common/formatters')
const { isValidDate } = require('../common/validators')

const FIELD_PREFIX = 'childDob-'

const fieldExistsWithPrefix = (prefix) => compose(any(startsWith(prefix)), keys)

const buildDateStringForPrefix = (prefix, fields) => toDateString(
  fields[`${prefix}-day`],
  fields[`${prefix}-month`],
  fields[`${prefix}-year`]
)

const convertDateFieldsToDateStrings = (fields, dates = {}, index = 1) => {
  const prefix = `${FIELD_PREFIX}${index}`

  if (!fieldExistsWithPrefix(prefix)(fields)) {
    return dates
  }

  const datesWithDateForPrefix = {
    ...dates,
    [prefix]: buildDateStringForPrefix(prefix, fields)
  }

  return convertDateFieldsToDateStrings(fields, datesWithDateForPrefix, index + 1)
}

const addDatesToBody = (req, res, next) => {
  const dateStrings = convertDateFieldsToDateStrings(req.body)

  req.session.children.datesOfBirthFields = Object.keys(dateStrings)

  req.body = {
    ...req.body,
    ...dateStrings
  }

  next()
}

const validateDateOfBirth = (dob, { req }) => {
  if (!isValidDate(dob)) {
    throw new Error(req.t('validation:childsDateOfBirthInvalid'))
  }

  return true
}

const callValidateChildrenDatesOfBirth = (req, res, next) =>
  check(req.session.children.datesOfBirthFields).custom(validateDateOfBirth)(req, res, next)

const validate = [
  addDatesToBody,
  callValidateChildrenDatesOfBirth
]

module.exports = {
  validate,
  fieldExistsWithPrefix,
  buildDateStringForPrefix,
  convertDateFieldsToDateStrings
}
