const test = require('tape')
const { handleOptionalMiddleware } = require('./register-form-routes')

test('handleOptionalMiddleware() should return the operation if defined', (t) => {
  const operation = 'operation'
  const fallback = 'fallback'
  const result = handleOptionalMiddleware(operation, fallback)

  t.equal(result, operation, 'should return the operation if defined')
  t.end()
})

test('handleOptionalMiddleware() should return the fallback if operation not defined', (t) => {
  const operation = undefined
  const fallback = 'fallback'
  const result = handleOptionalMiddleware(operation, fallback)

  t.equal(result, fallback, 'should return the fallback if operation not defined')
  t.end()
})

test('handleOptionalMiddleware() should return the default fallback if operation and fallback are not defined', (t) => {
  const result = handleOptionalMiddleware()

  t.equal(typeof result, 'function', 'should return the default fallback if operation and fallback are not defined')
  t.end()
})
