const test = require('tape')
const sinon = require('sinon')
const { getConfirmPage, getLanguageBase } = require('./confirm')

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

test('getLanguageBase', async (t) => {
  t.equal(getLanguageBase('en-GB'), 'en', 'should strip down to just en')
  t.equal(getLanguageBase('us-CA'), 'us', 'should strip down to just us')
  t.equal(getLanguageBase('cy'), 'cy', 'should remain as just cy')
  t.throws(getLanguageBase.bind(null, ''), /language provided in the request is blank/, 'A blank language should throw an error')
  t.throws(getLanguageBase.bind(null, undefined), /language provided in the request is blank/, 'An undefined language should throw an error')
  t.end()
})
