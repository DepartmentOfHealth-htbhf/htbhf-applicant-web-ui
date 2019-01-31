const { toDateString } = require('../common/formatters')

const transformData = (req) => {
  const dateOfBirth = toDateString(
    req.body['dateOfBirth-day'],
    req.body['dateOfBirth-month'],
    req.body['dateOfBirth-year']
  )
  return { dateOfBirth: dateOfBirth }
}

module.exports.transformData = transformData
