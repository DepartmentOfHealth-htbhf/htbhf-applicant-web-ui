const test = require('tape')
const { getPreviousNavigablePath, getPreviousPath } = require('./get-previous-path')

test('getPreviousNavigablePath() returns the path for previous step if isNavigable function does not exist', (t) => {
  const steps = [{ path: '/first' }, { path: '/second' }]
  const result = getPreviousNavigablePath(steps, 1, {})

  t.equal(result, '/first')
  t.end()
})

test('getPreviousNavigablePath() throws error if index is zero', (t) => {
  const steps = [{ path: '/first' }, { path: '/second' }]
  const result = () => getPreviousNavigablePath(steps, 0, {})

  t.throws(result, /No allowed back route found/, 'throws error if index is zero')
  t.end()
})

test('getPreviousNavigablePath() returns the path for previous step if isNavigable function exists and returns true', (t) => {
  const steps = [{ path: '/first', isNavigable: () => true }, { path: '/second' }]
  const result = getPreviousNavigablePath(steps, 1, {})

  t.equal(result, '/first')
  t.end()
})

test('getPreviousNavigablePath() returns the path for the first step if isNavigable function exists and returns false for second step', (t) => {
  const steps = [{ path: '/first' }, { path: '/second', isNavigable: () => false }, { path: '/third' }]
  const result = getPreviousNavigablePath(steps, 2, {})

  t.equal(result, '/first')
  t.end()
})

test('getPreviousNavigablePath() passes session to isNavigable function', (t) => {
  const session = { isNavigable: true }
  const steps = [{ path: '/first', isNavigable: (session) => session.isNavigable }, { path: '/second' }]
  const result = getPreviousNavigablePath(steps, 1, session)

  t.equal(result, '/first')
  t.end()
})

test('getPreviousNavigablePath() throws an error when no previous steps are allowed', (t) => {
  const steps = [{ path: '/first', isNavigable: () => false }, { path: '/second', isNavigable: () => false }, { path: '/third' }]
  const result = () => getPreviousNavigablePath(steps, 2, {})

  t.throws(result, /No allowed back route found/, 'throws an error when no previous steps are allowed')
  t.end()
})

test('getPreviousNavigablePath() throws an error if isNavigable() exists but is not a function', (t) => {
  const steps = [{ path: '/first', isNavigable: 'not-a-function' }, { path: '/second' }]
  const result = () => getPreviousNavigablePath(steps, 1, {})

  t.throws(result, /isNavigable must be a function for step {"path":"\/first","isNavigable":"not-a-function"}/, 'throws an error if isNavigable() exists but is not a function')
  t.end()
})

test('getPreviousNavigablePath() throws an error if isNavigable() does not return a boolean', (t) => {
  const steps = [{ path: '/first', isNavigable: () => 'not-a-boolean' }, { path: '/second' }]
  const result = () => getPreviousNavigablePath(steps, 1, {})

  t.throws(result, /isNavigable must return a boolean for step {"path":"\/first"}/, 'throws an error if isNavigable() exists but is not a function')
  t.end()
})

test('getPreviousPath() throws an error if step does not exist in list of steps', (t) => {
  const steps = [{ path: '/first' }]
  const step = { path: '/second' }
  const result = () => getPreviousPath(steps, step, {})

  t.throws(result, /Unable to find {"path":"\/second"} in the list of steps/, 'throws an error if step does not exist')
  t.end()
})

test('getPreviousPath() returns undefined if step is first in sequence', (t) => {
  const step = { path: '/first' }
  const steps = [step]
  const result = getPreviousPath(steps, step, {})

  t.equal(result, undefined)
  t.end()
})

test('getPreviousPath() returns path for previous step in sequence', (t) => {
  const stepOne = { path: '/first' }
  const stepTwo = { path: '/second' }
  const stepThree = { path: '/third' }
  const steps = [stepOne, stepTwo, stepThree]
  const result = getPreviousPath(steps, stepThree, {})

  t.equal(result, '/second')
  t.end()
})
