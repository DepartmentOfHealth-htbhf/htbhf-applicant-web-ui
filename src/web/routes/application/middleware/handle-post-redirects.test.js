const test = require('tape')
const sinon = require('sinon')
const { handlePostRedirects } = require('./handle-post-redirects')

const steps = [{ path: '/first', next: () => '/second' }, { path: '/second' }]

test('handlePostRedirects() should redirect when no response errors', async (t) => {
  const redirect = sinon.spy()
  const next = sinon.spy()
  const req = {
    method: 'POST',
    session: {},
    path: '/first'
  }

  const res = {
    redirect,
    locals: {}
  }

  handlePostRedirects(steps)(req, res, next)

  t.equal(redirect.called, true)
  t.equal(next.called, false)
  t.end()
})

test('handlePostRedirects() should call next() when response errors are present', async (t) => {
  const redirect = sinon.spy()
  const next = sinon.spy()

  const req = {
    method: 'POST',
    csrfToken: () => {},
    t: () => {},
    session: {},
    path: '/first'
  }

  const res = {
    redirect,
    locals: {
      errors: true
    }
  }

  handlePostRedirects(steps)(req, res, next)

  t.equal(redirect.called, false)
  t.equal(next.called, true)
  t.end()
})
