const test = require('tape')
const { mergeErrorMessage, mergeErrorStack, wrapError } = require('./errors')

const error = {
  stack: 'mock error stack'
}

const cause = {
  toString: () => 'mocking Error.prototype.toString()',
  stack: 'mock cause error stack'
}

const message = 'Massive error!!!'

test('mergeErrorMessage()', (t) => {
  const result = mergeErrorMessage(message, cause)
  const expected = 'Massive error!!!. mocking Error.prototype.toString()'

  t.equal(result, expected, 'formats the merged message correctly')
  t.end()
})

test('mergeErrorMessage() formats the merged message correctly when no cause is specified', (t) => {
  const result = mergeErrorMessage(message)
  const expected = 'Massive error!!!'

  t.equal(result, expected, 'formats the merged message correctly when no cause is specified')
  t.end()
})

test('mergeErrorStack() formats the merged stack correctly', (t) => {
  const result = mergeErrorStack(error, cause)
  const expected = 'mock error stack\nCaused by: mock cause error stack'

  t.equal(result, expected, 'formats the merged stack correctly')
  t.end()
})

test('mergeErrorStack() formats the merged stack correctly when no cause is specified', (t) => {
  const result = mergeErrorStack(error)
  const expected = 'mock error stack'

  t.equal(result, expected, 'formats the merged stack correctly when no cause is specified')
  t.end()
})

test('wrapError() returns an error with the correct props', (t) => {
  const result = wrapError({ cause, message, statusCode: 500 })
  const expectedMessage = 'Massive error!!!. mocking Error.prototype.toString()'
  const expectedCauseString = '\nCaused by: mock cause error stack'

  t.equal(result instanceof Error, true, 'should be an instance of Error')
  t.equal(result.message, expectedMessage, 'should have a correctly formatted message property')
  t.equal(result.stack.includes(expectedCauseString), true, 'should have a correctly formatted stack property')
  t.equal(result.statusCode, 500, 'should add the statusCode to the error')
  t.end()
})

test('wrapError() returns an error with the correct props when cause is not specified', (t) => {
  const result = wrapError({ message, statusCode: 500 })
  const expectedMessage = 'Massive error!!!'
  const expectedCauseString = '\nCaused by: mock cause error stack'

  t.equal(result instanceof Error, true, 'should be an instance of Error')
  t.equal(result.message, expectedMessage, 'should have a correctly formatted message property')
  t.equal(result.stack.includes(expectedCauseString), false, 'should have a correctly formatted stack property')
  t.equal(result.statusCode, 500, 'should add the statusCode to the error')
  t.end()
})
