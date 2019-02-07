const { isNil } = require('ramda')
const moment = require('moment')
const DATE_FORMAT = 'D MMMM YYYY'

const nilToString = (value) => isNil(value) ? '' : value.toString()

const toDateString = (day, month, year) => {
  const parseDay = nilToString(day).padStart(2, '0')
  const parseMonth = nilToString(month).padStart(2, '0')

  return [year, parseMonth, parseDay].join('-')
}

const dateAsString = ({ date = new Date(), monthAdjustment = 0 } = {}) => {
  if (typeof monthAdjustment !== 'number') {
    throw new Error('Month adjustment must be numeric')
  }
  const dateToChange = new Date(date)
  dateToChange.setMonth(dateToChange.getMonth() + monthAdjustment)
  const dd = dateToChange.getDate()
  const mm = dateToChange.getMonth() + 1
  const yyyy = dateToChange.getFullYear()
  return toDateString(dd, mm, yyyy)
}

// TODO - When we are no longer able to go directly to a page within the flow (which makes ATs simpler)
// we should reinforce the fact that day, month and year should be mandatory.
const buildFormattedDateForDisplay = (day, month, year) => {
  return moment({ years: year, months: month - 1, date: day }).format(DATE_FORMAT)
}

const buildFormattedDateForDisplayFromDate = (date) => {
  if (date === undefined || !(date instanceof Date)) {
    throw new Error('A date must be provided')
  }
  return moment(date).format(DATE_FORMAT)
}

module.exports = {
  toDateString,
  dateAsString,
  buildFormattedDateForDisplay,
  buildFormattedDateForDisplayFromDate
}
