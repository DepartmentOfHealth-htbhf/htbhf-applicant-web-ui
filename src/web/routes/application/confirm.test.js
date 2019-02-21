const test = require('tape')
const sinon = require('sinon')
const { getConfirmPage } = require('./confirm')

test('successful get clears the session and language cookie', async (t) => {
  const destroy = sinon.spy()
  const clearCookie = sinon.spy()
  const render = sinon.spy()
  const translate = sinon.spy()
  const req = {
    session: {
      destroy
    },
    t: translate,
    language: 'en-GB'
  }

  const res = { render, clearCookie }

  try {
    await getConfirmPage(req, res)
    t.equal(destroy.called, true)
    t.equal(clearCookie.calledWith('lang'), true)
    t.equal(res.render.called, true)
    t.end()
  } catch (error) {
    t.fail(error)
  }
})
