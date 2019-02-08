const test = require('tape')
const sinon = require('sinon')
const { renderView } = require('./render-view')

const template = 'template'
const getPageContent = () => ({ title: 'What is your name?' })
const redirectPath = 'redirect'

test('renderView() should redirect on POST request when no response errors', async (t) => {
  const redirect = sinon.spy()
  const req = { method: 'POST', session: {} }

  const res = {
    redirect,
    locals: {}
  }

  renderView(template, getPageContent, redirectPath)(req, res)

  t.equal(redirect.called, true)
  t.end()
})

test('renderView() should call res.render() on POST request when response errors are present', async (t) => {
  const redirect = sinon.spy()
  const render = sinon.spy()

  const req = {
    method: 'POST',
    csrfToken: () => {},
    t: () => {},
    session: {}
  }

  const res = {
    redirect,
    render,
    locals: {
      errors: true
    }
  }

  renderView(template, getPageContent, redirectPath)(req, res)

  t.equal(redirect.called, false)
  t.equal(render.called, true)
  t.end()
})

test('renderView() should call res.render() on GET request', async (t) => {
  const redirect = sinon.spy()
  const render = sinon.spy()
  const csrfToken = sinon.spy()

  const req = {
    method: 'GET',
    csrfToken,
    t: () => {},
    session: {}
  }

  const res = {
    redirect,
    render,
    locals: {}
  }

  renderView(template, getPageContent, redirectPath)(req, res)

  t.equal(redirect.called, false)
  t.equal(render.called, true)
  t.equal(csrfToken.called, true)
  t.equals(render.getCall(0).args[1].hasOwnProperty('csrfToken'), true)
  t.end()
})
