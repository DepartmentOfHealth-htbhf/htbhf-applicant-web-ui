const { isNil } = require('ramda')

const nilToString = (value) => isNil(value) ? '' : value.toString()

const toDateString = (day, month, year) => {
  const parseDay = nilToString(day).padStart(2, '0')
  const parseMonth = nilToString(month).padStart(2, '0')

  return [year, parseMonth, parseDay].join('-')
}

module.exports = {
  toDateString
}
