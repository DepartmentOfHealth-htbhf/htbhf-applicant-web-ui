const test = require('tape')
const sinon = require('sinon')
const { populateSession } = require('./populate-session')

test('populateSession() should copy fields from the request body by default', (t) => {
  const req = { body: { field1: 'value1', field2: 'value2', '_csrf': 'foo' }, session: {} }
  const res = null
  const next = sinon.spy()

  const operation = populateSession()
  operation(req, res, next)

  t.deepEqual(req.session.persistentAttributes, { field1: 'value1', field2: 'value2' }, 'should add body fields to the session')
  t.equal(next.called, true, 'it should call next()')
  t.end()
})

test('populateSession() should invoke the function provided to it', (t) => {
  const customResponse = { fieldA: 'valueA', fieldB: 'valueB' }
  const req = { body: { field1: 'value1', field2: 'value2', '_csrf': 'foo' }, session: {} }
  const res = null
  const next = sinon.spy()

  const operation = populateSession((req) => { return customResponse })
  operation(req, res, next)

  t.deepEqual(req.session.persistentAttributes, customResponse, 'should add custom response fields to the session')
  t.equal(next.called, true, 'it should call next()')
  t.end()
})
