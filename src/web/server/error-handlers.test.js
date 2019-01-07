const test = require('tape')
const colorize = require('tap-colorize')
const sinon = require('sinon')
const { errorHandler } = require('./error-handlers')

test.createStream().pipe(colorize()).pipe(process.stdout)

test('Error handler should set the status to 500', (t) => {
  const status = sinon.spy()

  const res = {
    status,
    render: () => {}
  }

  errorHandler({}, {}, res)

  t.equal(status.calledWith(500), true)
  t.end()
})
