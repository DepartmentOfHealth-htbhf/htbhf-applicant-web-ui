const test = require('tape')
const colorize = require('tap-colorize')
const sinon = require('sinon')
const { errorHandler } = require('./error-handlers')

test.createStream().pipe(colorize()).pipe(process.stdout)

test('Error handler should set a default status code if none set on error', (t) => {
  const status = sinon.spy()

  const res = {
    status,
    render: () => {}
  }

  errorHandler({}, {}, res)

  t.equal(status.calledWith(500), true)
  t.end()
})

test('Error handler should not set a default status code if code is set on error', (t) => {
  const statusCode = 400
  const err = { statusCode }
  const status = sinon.spy()

  const res = {
    status,
    render: () => {}
  }

  errorHandler(err, {}, res)

  t.equal(status.calledWith(statusCode), true)
  t.end()
})
