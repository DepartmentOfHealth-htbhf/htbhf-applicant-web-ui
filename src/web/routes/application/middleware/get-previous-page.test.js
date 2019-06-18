const test = require('tape')
const { getPreviousAllowedStep, getPreviousPage } = require('./get-previous-page')

test('getPreviousAllowedStep() returns the path for previous step if isNavigable function does not exist', (t) => {
  const steps = [{ path: '/first' }, { path: '/second' }]
  const result = getPreviousAllowedStep(steps, 1, {})

  t.equal(result, '/first')
  t.end()
})

test('getPreviousAllowedStep() throws error if index is zero', (t) => {
  const steps = [{ path: '/first' }, { path: '/second' }]
  const result = () => getPreviousAllowedStep(steps, 0, {})

  t.throws(result, /No allowed back route found/, 'throws error if index is zero')
  t.end()
})

test('getPreviousAllowedStep() returns the path for previous step if isNavigable function exists and returns true', (t) => {
  const steps = [{ path: '/first', isNavigable: () => true }, { path: '/second' }]
  const result = getPreviousAllowedStep(steps, 1, {})

  t.equal(result, '/first')
  t.end()
})

test('getPreviousAllowedStep() returns the path for the first step if isNavigable function exists and returns false for second step', (t) => {
  const steps = [{ path: '/first' }, { path: '/second', isNavigable: () => false }, { path: '/third' }]
  const result = getPreviousAllowedStep(steps, 2, {})

  t.equal(result, '/first')
  t.end()
})

test('getPreviousAllowedStep() passes session to isNavigable function', (t) => {
  const session = { isNavigable: true }
  const steps = [{ path: '/first', isNavigable: (session) => session.isNavigable }, { path: '/second' }]
  const result = getPreviousAllowedStep(steps, 1, session)

  t.equal(result, '/first')
  t.end()
})

test('getPreviousAllowedStep() throws an error when no previous steps are allowed', (t) => {
  const steps = [{ path: '/first', isNavigable: () => false }, { path: '/second', isNavigable: () => false }, { path: '/third' }]
  const result = () => getPreviousAllowedStep(steps, 2, {})

  t.throws(result, /No allowed back route found/, 'throws an error when no previous steps are allowed')
  t.end()
})

test('getPreviousAllowedStep() throws an error if isNavigable() exists but is not a function', (t) => {
  const steps = [{ path: '/first', isNavigable: 'not-a-function' }, { path: '/second' }]
  const result = () => getPreviousAllowedStep(steps, 1, {})

  t.throws(result, /isNavigable must be a function for step {"path":"\/first","isNavigable":"not-a-function"}/, 'throws an error if isNavigable() exists but is not a function')
  t.end()
})

test('getPreviousAllowedStep() throws an error if isNavigable() does not return a boolean', (t) => {
  const steps = [{ path: '/first', isNavigable: () => 'not-a-boolean' }, { path: '/second' }]
  const result = () => getPreviousAllowedStep(steps, 1, {})

  t.throws(result, /isNavigable must return a boolean for step {"path":"\/first"}/, 'throws an error if isNavigable() exists but is not a function')
  t.end()
})

test('getPreviousPage() throws an error if step does not exist in list of steps', (t) => {
  const steps = [{ path: '/first' }]
  const step = { path: '/second' }
  const result = () => getPreviousPage(steps, step, {})

  t.throws(result, /Unable to find {"path":"\/second"} in the list of steps/, 'throws an error if step does not exist')
  t.end()
})

test('getPreviousPage() returns undefined if step is first in sequence', (t) => {
  const step = { path: '/first' }
  const steps = [step]
  const result = getPreviousPage(steps, step, {})

  t.equal(result, undefined)
  t.end()
})

test('getPreviousPage() returns path for previous step in sequence', (t) => {
  const stepOne = { path: '/first' }
  const stepTwo = { path: '/second' }
  const stepThree = { path: '/third' }
  const steps = [stepOne, stepTwo, stepThree]
  const result = getPreviousPage(steps, stepThree, {})

  t.equal(result, '/second')
  t.end()
})
