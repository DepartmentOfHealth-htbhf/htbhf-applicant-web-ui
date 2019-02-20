const mergeErrorMessage = (message, cause) => cause ? `${message}. ${cause.toString()}` : message

const mergeErrorStack = (error, cause) => cause ? `${error.stack}\nCaused by: ${cause.stack}` : error.stack

const wrapError = ({ cause, message }) => {
  const error = new Error()
  Error.captureStackTrace(error, wrapError)

  return Object.assign(new Error(), {
    message: mergeErrorMessage(message, cause),
    stack: mergeErrorStack(error, cause)
  })
}

module.exports = {
  mergeErrorMessage,
  mergeErrorStack,
  wrapError
}
