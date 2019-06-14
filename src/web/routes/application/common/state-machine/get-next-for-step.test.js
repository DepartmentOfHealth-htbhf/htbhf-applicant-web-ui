const test = require('tape')
const sinon = require('sinon')
const { getNextForStep } = require('./get-next-for-step')

test('getNextForStep() throws error if next is not a function', (t) => {
  const step = { next: 'This is not a function' }
  const req = {}
  const result = () => getNextForStep(req, step)

  t.throws(result, /Next property for step must be a function/, 'throws error if next is not a function')
  t.end()
})

test('getNextForStep() throws error if result of calling next is not a string', (t) => {
  const step = { next: () => null }
  const req = {}
  const result = () => getNextForStep(req, step)

  t.throws(result, /Next function must return a string/, 'throws error if result of calling next is not a string')
  t.end()
})

test('getNextForStep() throws error if result of calling next does not start with forward slash', (t) => {
  const step = { next: () => 'path-without-forward-slash' }
  const req = {}
  const result = () => getNextForStep(req, step)

  t.throws(result, /Next path must start with a forward slash/, 'throws error if result of calling next does not start with forward slash')
  t.end()
})

test('getNextForStep() should return the result of calling next', (t) => {
  const step = { next: () => '/the-next-path' }
  const req = {}
  const result = getNextForStep(req, step)

  t.equals(result, '/the-next-path', 'return the result of calling next')
  t.end()
})

test('getNextForStep() passes request as an argument when calling next function', (t) => {
  const next = sinon.stub().returns('/the-next-path')
  const req = { session: { some: 'data' } }
  const step = { next }

  getNextForStep(req, step)

  t.equals(next.getCall(0).args[0], req, 'passes request as an argument when calling next function')
  t.end()
})
