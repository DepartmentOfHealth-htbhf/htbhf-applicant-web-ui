const test = require('tape')
const sinon = require('sinon')
const { renderView } = require('./render-view')

const step = {
  template: 'template',
  pageContent: () => ({ title: 'What’s your name?' }),
  next: 'redirect'
}

test('renderView() should call res.render() on GET request', async (t) => {
  const render = sinon.spy()
  const csrfToken = sinon.spy()

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
  t.equal(csrfToken.called, true)
  t.equals(render.getCall(0).args[1].hasOwnProperty('csrfToken'), true)
  t.end()
})
