const test = require('tape')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const getAdditionalDataForStep = sinon.stub().returns({ foo: 'bar' })

const { renderView } = proxyquire('./render-view', {
  '../../session-accessors': { getAdditionalDataForStep }
})

const step = {
  template: 'template',
  pageContent: () => ({ title: 'What’s your name?' }),
  next: 'redirect'
}

test('renderView() should call res.render() on GET request', async (t) => {
  const render = sinon.spy()
  const csrfToken = () => 'myCsrfToken'

  const req = {
    method: 'GET',
    csrfToken,
    t: () => {},
    session: {}
  }

  const res = {
    render,
    locals: {}
  }

  renderView(step)(req, res)

  t.equal(render.called, true)

  const expectedArg = {
    title: 'What’s your name?',
    foo: 'bar',
    csrfToken: 'myCsrfToken'
  }
  t.deepEquals(render.getCall(0).args[1], expectedArg)
  t.end()
})
