const test = require('tape')
const sinon = require('sinon')
const { handleOptionalMiddleware } = require('./register-journey-routes')

test('handleOptionalMiddleware() should call the operation if defined with correct arguments', (t) => {
  const operation = sinon.spy()
  const fallback = sinon.spy()
  const args = ['first argument', 'second argument']

  handleOptionalMiddleware(args)(operation, fallback)
  t.deepEqual(operation.getCall(0).args, args, 'should call the operation if defined with correct arguments')
  t.equal(fallback.called, false, 'does not call the fallback')
  t.end()
})

test('handleOptionalMiddleware() should call the fallback if operation not defined with correct arguments', (t) => {
  const operation = undefined
  const fallback = sinon.spy()
  const args = ['first argument', 'second argument']
  handleOptionalMiddleware(args)(operation, fallback)

  t.deepEqual(fallback.getCall(0).args, args, 'should call the fallback if operation not defined with correct arguments')
  t.end()
})

test('handleOptionalMiddleware() should return the default fallback if operation and fallback are not defined', (t) => {
  const req = {}
  const res = {}
  const next = sinon.spy()
  handleOptionalMiddleware()()(req, res, next)

  t.equal(next.called, true, 'default fallback calls next()')
  t.end()
})
