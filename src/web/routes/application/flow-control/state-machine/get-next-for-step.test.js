const test = require('tape')
const { getNextPathFromSteps, getNextForStep } = require('./get-next-for-step')
const { CHECK_ANSWERS_URL } = require('../../paths')

const step1 = {
  path: '/first'
}

const step2 = {
  path: '/second'
}

const step3 = {
  path: '/third'
}

const steps = [step1, step2, step3]

test('getNextPathFromSteps() gets the path for the next step in sequence of steps', (t) => {
  const result = getNextPathFromSteps(steps, step1)
  t.equal(result, '/second')
  t.end()
})

test(`getNextPathFromSteps() returns ${CHECK_ANSWERS_URL} for final step`, (t) => {
  const result = getNextPathFromSteps(steps, step3)
  t.equal(result, CHECK_ANSWERS_URL)
  t.end()
})

test('getNextForStep() returns path for next step in sequence if next property is undefined on step', (t) => {
  const req = {}
  const result = getNextForStep(req, step2, steps)

  t.equal(result, '/third', 'returns path for next step in sequence if next property is undefined on step')
  t.end()
})

test('getNextForStep() throws error if next is not a function', (t) => {
  const step = { next: 'This is not a function' }
  const req = {}
  const result = () => getNextForStep(req, step, [...steps, step])

  t.throws(result, /Next property for step must be a function/, 'throws error if next is not a function')
  t.end()
})

test('getNextForStep() throws error if result of calling next is not a string', (t) => {
  const step = { next: () => null }
  const req = {}
  const result = () => getNextForStep(req, step, [...steps, step])

  t.throws(result, /Next function must return a string starting with a forward slash/, 'throws error if result of calling next is not a string')
  t.end()
})

test('getNextForStep() throws error if result of calling next does not start with forward slash', (t) => {
  const step = { next: () => 'path-without-forward-slash' }
  const req = {}
  const result = () => getNextForStep(req, step, [...steps, step])

  t.throws(result, /Next function must return a string starting with a forward slash/, 'throws error if result of calling next does not start with forward slash')
  t.end()
})

test('getNextForStep() should return the result of calling next', (t) => {
  const step = { next: () => '/the-next-path' }
  const req = {}
  const result = getNextForStep(req, step, [...steps, step])

  t.equals(result, '/the-next-path', 'return the result of calling next')
  t.end()
})

test('getNextForStep() passes request as an argument when calling next function', (t) => {
  const req = { session: { some: '/path' } }
  const next = (req) => req.session.some
  const step = { next }

  const result = getNextForStep(req, step, [...steps, step])

  t.equals(result, '/path', 'passes request as an argument when calling next function')
  t.end()
})
