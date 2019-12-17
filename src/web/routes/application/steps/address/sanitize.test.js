const test = require('tape')
const sinon = require('sinon')
const { sanitize } = require('./sanitize')

test('sanitize replaces multiple whitespace with one and saves to a new variable', (t) => {
  const req = {
    body: {
      postcode: 'aa1     1aa'
    }
  }
  const expectedSanitizedPostcode = 'aa1 1aa'
  const expectedPostcode = 'aa1     1aa'
  const next = sinon.spy()

  sanitize()(req, {}, next)

  t.equal(req.body.sanitizedPostcode, expectedSanitizedPostcode, 'it should replace multiple spaces with a single one')
  t.equal(req.body.postcode, expectedPostcode, 'it should not mutate the input')
  t.equal(next.called, true, 'it should called next()')
  t.end()
})
