const test = require('tape')
const { getPreviousPage } = require('./configure-get')

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

test('getPreviousPage() should return undefined for first page', (t) => {
  const result = getPreviousPage(steps, steps[0])

  t.equal(result, undefined)
  t.end()
})

test('getPreviousPage() should return path of previous page when not the first page', (t) => {
  const result = getPreviousPage(steps, steps[1])

  t.equal(result, 'first')
  t.end()
})

test('getPreviousPage() should throw an error when the step is not in the list of steps', (t) => {
  t.throws(() => getPreviousPage(steps, { path: 'n/a' }), `Unable to find { path: 'n/a' } in the list of steps`)
  t.end()
})
