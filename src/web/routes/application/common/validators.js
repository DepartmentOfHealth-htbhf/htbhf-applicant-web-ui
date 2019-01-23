const { isNil } = require('ramda')
const validator = require('validator')
const { toDateString } = require('./formatters')

const DATE_PATTERN = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/

const isValidDate = (dateString) =>
  !isNil(dateString) && validator.matches(dateString, DATE_PATTERN) && validator.isISO8601(dateString, { strict: true })

const todayAsString = () => {
  const today = new Date()
  const dd = today.getDate()
  const mm = today.getMonth() + 1
  const yyyy = today.getFullYear()
  return toDateString(dd, mm, yyyy)
}

const isDateInPast = (dateString) => {
  if (isValidDate(dateString)) {
    return validator.isBefore(dateString, todayAsString())
  }
  return true
}

module.exports = {
  isValidDate,
  isDateInPast
}
