const { isNil } = require('ramda')
const moment = require('moment')

const DATE_FORMAT = 'D MMMM YYYY'
const EXAMPLE_DATE_FORMAT = 'D M YYYY'

const nilToString = (value) => isNil(value) ? '' : value.toString()

const toDateString = (day, month, year) => {
  const parseDay = nilToString(day).padStart(2, '0')
  const parseMonth = nilToString(month).padStart(2, '0')

  return [year, parseMonth, parseDay].join('-')
}

const dateAsString = ({ date = new Date(), monthAdjustment = 0, yearAdjustment = 0 } = {}) => {
  if (typeof monthAdjustment !== 'number') {
    throw new Error('Month adjustment must be numeric')
  }

  if (typeof yearAdjustment !== 'number') {
    throw new Error('Year adjustment must be numeric')
  }

  const dateToChange = new Date(date)
  dateToChange.setMonth(dateToChange.getMonth() + monthAdjustment)
  dateToChange.setFullYear(dateToChange.getFullYear() + yearAdjustment)
  const dd = dateToChange.getDate()
  const mm = dateToChange.getMonth() + 1
  const yyyy = dateToChange.getFullYear()
  return toDateString(dd, mm, yyyy)
}

// TODO - When we are no longer able to go directly to a page within the flow (which makes ATs simpler)
// we should reinforce the fact that day, month and year should be mandatory.
const formatDateForDisplay = (day, month, year) => {
  return moment({ years: year, months: month - 1, date: day }).format(DATE_FORMAT)
}

const formatDateForDisplayFromDate = (date) => {
  if (date === undefined || !(date instanceof Date)) {
    throw new Error('A date must be provided')
  }
  return moment(date).format(DATE_FORMAT)
}

const getExampleDate = ({ fromDate = new Date(), monthOffset = 0, yearOffset = 0 } = {}) =>
  moment(fromDate).set('date', 28).add(monthOffset - 1, 'months').add(yearOffset, 'years').format(EXAMPLE_DATE_FORMAT)

module.exports = {
  toDateString,
  dateAsString,
  formatDateForDisplay,
  formatDateForDisplayFromDate,
  getExampleDate
}
