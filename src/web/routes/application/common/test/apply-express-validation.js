const { validationResult } = require('express-validator/check')

const callMiddleware = (req, res) => async (middleware) => {
  try {
    await middleware(req, res, () => undefined)
  } catch (error) {
    console.log('Error calling middleware:', error)
  }
}

/**
 * This test function assumes all mutation of the request object
 * occurs synchronously. This may error if middleware in the queue
 * implements any asynchronous code.
 */
const callMiddlewareQueue = async (req, res, middlewares) => {
  try {
    await Promise.all(middlewares.map(callMiddleware(req, res)))
  } catch (error) {
    console.log('Error calling middleware queue:', error)
  }
}

const applyExpressValidation = async (req, middleware) => {
  try {
    await callMiddlewareQueue(req, {}, middleware)
    return validationResult(req)
  } catch (error) {
    console.log('Error applying express validation:', error)
  }
}

module.exports = {
  callMiddlewareQueue,
  applyExpressValidation
}
