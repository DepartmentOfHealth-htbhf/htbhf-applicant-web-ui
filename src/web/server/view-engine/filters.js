const { compose, map, values, isNil } = require('ramda')

const camelToKebabCase = (string) => string.replace(/([a-z0-9])([A-Z0-9])/g, '$1-$2').toLowerCase()

const toError = (error) => ({
  text: error.msg,
  href: `#${camelToKebabCase(error.param)}-error`
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
  getErrorForField,
  camelToKebabCase
}
