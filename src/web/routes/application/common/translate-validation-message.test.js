const test = require('tape')
const sinon = require('sinon')
const { translateValidationMessage } = require('./translate-validation-message')

test('translateValidationMessage()', (t) => {
  const message = 'this is a message for an invalid input'
  const value = 'value'
  const translate = sinon.spy()
  const req = { t: translate }

  translateValidationMessage(message)(value, { req })
  t.equal(translate.calledWith(message), true, 'it should call req.t() with the provided message')
  t.end()
})
