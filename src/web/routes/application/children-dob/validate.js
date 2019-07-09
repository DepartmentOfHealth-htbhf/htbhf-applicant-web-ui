const { check } = require('express-validator')
const { compose, keys, any, startsWith, pickBy } = require('ramda')
const { toDateString } = require('../common/formatters')
const { isValidDate, isDateMoreThanFourYearsAgo, isDateInTheFuture } = require('../common/validators')
const { translateValidationMessage } = require('../common/translate-validation-message')

const FIELD_PREFIX = 'childDob-'
const CHILD_NAME_PREFIX = 'childName-'
const CHILD_NAME_MAX_LENGTH = 500

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

  // At this point the date of birth keys are known, so they are stored in
  // session for use by subsequent validation middleware
  req.session.children.datesOfBirthFields = Object.keys(dateStrings)

  req.body = {
    ...req.body,
    ...dateStrings
  }

  next()
}

const validateDateOfBirth = (dob, { req }) => {
  if (!isValidDate(dob)) {
    throw new Error(req.t('validation:childDateOfBirthInvalid'))
  }

  if (isDateMoreThanFourYearsAgo(dob)) {
    throw new Error(req.t('validation:childDateOfBirthFourYearsOrOlder'))
  }

  if (isDateInTheFuture(dob)) {
    throw new Error(req.t('validation:childDateOfBirthInvalid'))
  }

  return true
}

const callValidateChildrenDatesOfBirth = (req, res, next) =>
  // Validating values in `req.body` from keys that have previously been stored in session
  check(req.session.children.datesOfBirthFields).custom(validateDateOfBirth)(req, res, next)

const isChildNameKey = (val, key) => key.startsWith(CHILD_NAME_PREFIX)

const getChildrenNameKeys = compose(keys, pickBy(isChildNameKey))

const callValidateChildrenNames = (req, res, next) =>
  check(getChildrenNameKeys(req.body))
    .isLength({ max: CHILD_NAME_MAX_LENGTH })
    .withMessage(translateValidationMessage('validation:childNameTooLong'))(req, res, next)

const validate = [
  addDatesToBody,
  callValidateChildrenDatesOfBirth,
  callValidateChildrenNames
]

module.exports = {
  validate,
  fieldExistsWithPrefix,
  buildDateStringForPrefix,
  convertDateFieldsToDateStrings,
  isChildNameKey,
  getChildrenNameKeys,
  validateDateOfBirth
}
