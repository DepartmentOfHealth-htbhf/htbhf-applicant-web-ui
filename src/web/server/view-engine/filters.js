const { compose, map, values, isNil } = require('ramda')

const toError = (error) => ({
  text: error.msg,
  href: `#${error.param}-error`
})

const toErrorList = compose(values, map(toError))

const getErrorByParam = (errors, field) =>
  isNil(errors) ? null : errors.find(error => error.param === field)

const getErrorForField = (errors, field) => {
  const error = getErrorByParam(errors, field)

  return error ? {
    text: error.msg
  } : null
}

module.exports = {
  toErrorList,
  getErrorForField
}
