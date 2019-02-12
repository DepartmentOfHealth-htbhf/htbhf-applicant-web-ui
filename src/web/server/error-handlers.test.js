const test = require('tape')
const sinon = require('sinon')
const { errorHandler } = require('./error-handlers')

test('Error handler should set the status to 500', (t) => {
  const status = sinon.spy()

  const req = {
    t: () => {}
  }

  const res = {
    status,
    render: () => {}
  }

  errorHandler({}, req, res)

  t.equal(status.calledWith(500), true)
  t.end()
})
