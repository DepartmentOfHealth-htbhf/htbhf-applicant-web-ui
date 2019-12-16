const test = require('tape')
const sinon = require('sinon')
const { sanitize } = require('./sanitize')

test('sanitize removes white space and saves to a new variable', (t) => {
  const req = {
    body: {
      nino: 'ab 12 34 56 c '
    }
  }
  const expectedSanitized = 'ab123456c'
  const expectedNino = 'ab 12 34 56 c '
  const next = sinon.spy()

  sanitize()(req, {}, next)

  t.equal(req.body.nino, expectedNino, 'it should not mutate the input')
  t.equal(req.body.sanitizedNino, expectedSanitized, 'it should remove whitespace and save to a new variable')
  t.equal(next.called, true)
  t.end()
})
