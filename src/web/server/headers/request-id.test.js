const test = require('tape')
const sinon = require('sinon')
const { requestID } = require('./request-id')

test('requestID() should not set request ID header if header already exists', (t) => {
  const uuidFn = sinon.spy()
  const req = {
    headers: {
      'x-request-id': '1234'
    }
  }
  const res = {}
  const next = () => {}

  requestID(uuidFn)(req, res, next)

  const result = req.headers['x-request-id']
  const expected = '1234'

  t.equal(uuidFn.called, false, 'uuid function was not called')
  t.equal(result, expected, 'request ID header is not altered')
  t.end()
})

test('requestID() should look for X-Vcap-Request-Id if X-Request-ID does not exist', (t) => {
  const uuidFn = sinon.spy()
  const req = {
    headers: {
      'x-vcap-request-id': '1234'
    }
  }
  const res = {}
  const next = () => {}

  requestID(uuidFn)(req, res, next)

  const result = req.headers['x-request-id']
  const expected = '1234'

  t.equal(uuidFn.called, false, 'uuid function was not called')
  t.equal(result, expected, 'request ID header is read from X-Vcap-Request-Id')
  t.end()
})

test('requestID() should set request ID header if header does not exist', (t) => {
  const uuidFn = sinon.stub().returns('5678')
  const req = {
    headers: {}
  }
  const res = {}
  const next = () => {}

  requestID(uuidFn)(req, res, next)

  const result = req.headers['x-request-id']
  const expected = '5678'

  t.equal(uuidFn.called, true, 'uuid function was called')
  t.equal(result, expected, 'request ID header is set to return value of uuid function')
  t.end()
})
