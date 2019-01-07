const test = require('tape')
const colorize = require('tap-colorize')
const sinon = require('sinon')
const request = require('request-promise')
const { postConfirm } = require('./post')

test.createStream().pipe(colorize()).pipe(process.stdout)

const config = {
  environment: {
    CLAIM_BASE_URL: 'http://test.com'
  }
}

test('successful post clears the session and redirects', (t) => {
  const destroy = sinon.spy()
  const redirect = sinon.spy()
  const req = {
    session: {
      destroy
    }
  }
  const res = { redirect }
  const next = {}

  sinon.stub(request, 'post').returns(Promise.resolve())

  postConfirm(config)(req, res, next)

  t.equal(destroy.called, true)

  t.end()
})
