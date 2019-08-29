const test = require('tape')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const { TEXT, EMAIL } = require('../common/constants')
const { contentSummary, requestBody } = require('./phone-number')

const handleConfirmationCodeReset = sinon.spy()

const { behaviourForPost } = proxyquire('./phone-number', { '../common/confirmation-code': { handleConfirmationCodeReset } })

test('Enter name contentSummary() should return content summary in correct format', (t) => {
  const req = {
    t: string => string,
    session: {
      claim: {
        phoneNumber: '07123456789'
      }
    }
  }
  const result = contentSummary(req)

  const expected = {
    key: 'phoneNumber.summaryKey',
    value: '07123456789'
  }

  t.deepEqual(result, expected, 'should return content summary in correct format')
  t.end()
})

test('behaviourForPost() resets confirmation code if the user updated their phone number and received confirmation code via text', (t) => {
  const req = {
    session: {
      claim: {
        channelForCode: TEXT,
        phoneNumber: '07777777777'
      }
    },
    body: {
      phoneNumber: '07111111111'
    }
  }

  behaviourForPost()(req, {}, () => {})

  t.equal(handleConfirmationCodeReset.called, true)
  handleConfirmationCodeReset.resetHistory()
  t.end()
})

test('behaviourForPost() does not reset confirmation code if the user updated their phone number and received confirmation code via email', (t) => {
  const req = {
    session: {
      claim: {
        channelForCode: EMAIL,
        phoneNumber: '07777777777'
      }
    },
    body: {
      phoneNumber: '07111111111'
    }
  }

  behaviourForPost()(req, {}, () => {})

  t.equal(handleConfirmationCodeReset.called, false)
  handleConfirmationCodeReset.resetHistory()
  t.end()
})

test('behaviourForPost() does not reset confirmation code if the user has not updated their phone number', (t) => {
  const req = {
    session: {
      claim: {
        channelForCode: TEXT,
        phoneNumber: '07777777777'
      }
    },
    body: {
      phoneNumber: '07777777777'
    }
  }

  behaviourForPost()(req, {}, () => {})

  t.equal(handleConfirmationCodeReset.called, false)
  handleConfirmationCodeReset.resetHistory()
  t.end()
})

test('requestBody() returns request body in correct format', (t) => {
  const req = {
    session: {
      claim: {
        phoneNumber: '07700 900645',
        formattedPhoneNumber: '+447700900645'
      }
    }
  }

  const result = requestBody(req.session)

  const expected = {
    phoneNumber: '+447700900645'
  }

  t.deepEqual(result, expected, 'returns request body in correct format')
  t.end()
})
