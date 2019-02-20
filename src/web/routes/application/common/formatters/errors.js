const mergeErrorMessage = (message, cause) => cause ? `${message}. ${cause.toString()}` : message

const mergeErrorStack = (error, cause) => cause ? `${error.stack}\nCaused by: ${cause.stack}` : error.stack

const mergeErrorProps = ({ cause, message } = {}) => {
  const error = new Error()
  Error.captureStackTrace(error, mergeErrorProps)

  return Object.assign(new Error(), {
    message: mergeErrorMessage(message, cause),
    stack: mergeErrorStack(error, cause)
  })
}

module.exports = {
  mergeErrorMessage,
  mergeErrorStack,
  mergeErrorProps
}
