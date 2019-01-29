const { isNil } = require('ramda')

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

module.exports = {
  toDateString,
  dateAsString
}
