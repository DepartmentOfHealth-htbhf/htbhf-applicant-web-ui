const test = require('tape')
const sinon = require('sinon')
const { sanitize } = require('./sanitize')

test('sanitize replaces multiple whitespace with one, converts to uppercase and saves to a new variable', (t) => {
  const req = {
    body: {
      postcode: 'bs1     4tb'
    }
  }
  const expectedSanitizedPostcode = 'BS1 4TB'
  const expectedPostcode = 'bs1     4tb'
  const next = sinon.spy()

  sanitize()(req, {}, next)

  t.equal(req.body.sanitizedPostcode, expectedSanitizedPostcode, 'it should replace multiple spaces with a single one and convert to uppercase')
  t.equal(req.body.postcode, expectedPostcode, 'it should not mutate the input')
  t.equal(next.called, true, 'it should called next()')
  t.end()
})
