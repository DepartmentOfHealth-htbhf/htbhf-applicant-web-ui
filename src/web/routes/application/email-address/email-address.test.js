const test = require('tape')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const { contentSummary } = require('./email-address')

const { TEXT, EMAIL } = require('../common/constants')

const handleConfirmationCodeReset = sinon.spy()

const { behaviourForPost } = proxyquire('./email-address', { '../common/confirmation-code': { handleConfirmationCodeReset } })

const req = {
  t: string => string,
  session: {
    claim: {
      emailAddress: 'test@email.com'
    }
  }
}

test('Enter name contentSummary() should return content summary in correct format', (t) => {
  const result = contentSummary(req)

  const expected = {
    key: 'emailAddress.summaryKey',
    value: 'test@email.com'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format')
  t.end()
})

test('behaviourForPost() resets confirmation code if the user updated their email address and received confirmation code via email', (t) => {
  const req = {
    session: {
      claim: {
        channelForCode: EMAIL,
        emailAddress: 'test@email.com'
      }
    },
    body: {
      emailAddress: 'different-email-adddress@email.com'
    }
  }

  behaviourForPost()(req, {}, () => {})

  t.equal(handleConfirmationCodeReset.called, true)
  handleConfirmationCodeReset.resetHistory()
  t.end()
})

test('behaviourForPost() does not reset confirmation code if the user updated their email address and received confirmation code via text', (t) => {
  const req = {
    session: {
      claim: {
        channelForCode: TEXT,
        emailAddress: 'test@email.com'
      }
    },
    body: {
      phoneNumber: 'different-email-adddress@email.com'
    }
  }

  behaviourForPost(req, {}, () => {})

  t.equal(handleConfirmationCodeReset.called, false)
  handleConfirmationCodeReset.resetHistory()
  t.end()
})

test('behaviourForPost() does not reset confirmation code if the user has not updated their email address', (t) => {
  const req = {
    session: {
      claim: {
        channelForCode: EMAIL,
        emailAddress: 'test@email.com'
      }
    },
    body: {
      emailAddress: 'test@email.com'
    }
  }

  behaviourForPost(req, {}, () => {})

  t.equal(handleConfirmationCodeReset.called, false)
  handleConfirmationCodeReset.resetHistory()
  t.end()
})
