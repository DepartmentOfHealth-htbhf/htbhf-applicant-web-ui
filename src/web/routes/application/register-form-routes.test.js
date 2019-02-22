const test = require('tape')
const { handleOptionalMiddleware, getPreviousPage } = require('./register-form-routes')

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

test('getPreviousPage() should return undefined for first page', (t) => {
  const steps = [
    {
      path: 'first',
      next: 'second'
    },
    {
      path: 'second',
      next: 'third'
    }
  ]

  const result = getPreviousPage(steps, steps[0])

  t.equal(result, undefined)
  t.end()
})

test('getPreviousPage() should return path of previous page when not the first page', (t) => {
  const steps = [
    {
      path: 'first',
      next: 'second'
    },
    {
      path: 'second',
      next: 'third'
    }
  ]

  const result = getPreviousPage(steps, steps[1])

  t.equal(result, 'first')
  t.end()
})

test('getPreviousPage() should throw an error when the step is not in the list of steps', (t) => {
  const steps = [
    {
      path: 'first',
      next: 'second'
    },
    {
      path: 'second',
      next: 'third'
    }
  ]
  t.throws(() => getPreviousPage(steps, { path: 'n/a' }), `Unable to find { path: 'n/a' } in the list of steps`)
  t.end()
})
