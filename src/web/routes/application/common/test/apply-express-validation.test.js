const test = require('tape')
const sinon = require('sinon')
const { callMiddlewareQueue } = require('./apply-express-validation')

const REQ = 'request'
const RES = 'response'

const assertCorrectMiddlewareCall = (t, middleware) => {
  t.equal(middleware.calledOnce, true, 'calls middleware once')
  t.equal(middleware.getCall(0).args[0], REQ, 'calls middleware with req')
  t.equal(middleware.getCall(0).args[1], RES, 'calls middleware with res')
}

test('callMiddlewareQueue() calls all middleware in queue', async (t) => {
  const middlewareOne = sinon.spy()
  const middlewareTwo = sinon.spy()
  const middlewareThree = sinon.spy()
  const middleware = [middlewareOne, middlewareTwo, middlewareThree]

  try {
    await callMiddlewareQueue(REQ, RES, middleware)

    assertCorrectMiddlewareCall(t, middlewareOne)
    assertCorrectMiddlewareCall(t, middlewareTwo)
    assertCorrectMiddlewareCall(t, middlewareThree)
  } catch (error) {
    t.fail(error)
  } finally {
    t.end()
  }
})
