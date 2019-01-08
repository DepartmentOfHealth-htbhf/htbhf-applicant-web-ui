const { isEmpty } = require('ramda')

const FIRST_NAME_MAX_LENGTH = 5
const LAST_NAME_MAX_LENGTH = 5
const MISSING_LAST_NAME_MSG = 'Missing last name'
const FIRST_NAME_TOO_LONG_MSG = 'First name is too long'
const LAST_NAME_TOO_LONG_MSG = 'Last name is too long'

const validate = (req, res, next) => {
  const err = {}
  if (req.body.firstName && req.body.firstName.length > FIRST_NAME_MAX_LENGTH) {
    err.firstName = {
      text: FIRST_NAME_TOO_LONG_MSG
    }
  }
  if (isEmpty(req.body.lastName)) {
    err.lastName = {
      text: MISSING_LAST_NAME_MSG
    }
  } else {
    if (req.body.lastName.length > LAST_NAME_MAX_LENGTH) {
      err.lastName = {
        text: LAST_NAME_TOO_LONG_MSG
      }
    }
  }

  if (!isEmpty(err)) {
    res.locals.errors = err
  }

  next()
}

module.exports = {
  validate
}
