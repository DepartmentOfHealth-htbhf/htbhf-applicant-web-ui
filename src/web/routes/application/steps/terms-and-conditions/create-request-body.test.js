const test = require('tape')
const { createRequestBody, createClaim } = require('./create-request-body')

test('createClaim() creates a claim in the correct format', (t) => {
  const steps = [
    {
      requestBody: (session) => ({
        bodyValueOne: session['valueOne']
      })
    }, {
      requestBody: (session) => ({
        nestedValues: {
          nestedBodyValueOne: session['valueOne'],
          nestedBodyValueTwo: session['valueTwo']
        }
      })
    }
  ]

  const session = {
    valueOne: 'one',
    valueTwo: 'two'
  }

  const result = createClaim(steps, session)

  const expected = {
    bodyValueOne: 'one',
    nestedValues: {
      nestedBodyValueOne: 'one',
      nestedBodyValueTwo: 'two'
    }
  }

  t.deepEqual(result, expected, 'creates the claim in the correct format')
  t.end()
})

const requestHeaders = {
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.80 Safari/537.36',
  'x-forwarded-for': '127.0.0.1',
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
  'another-header': 'foo'
}

const expectedFingerprint = {
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.80 Safari/537.36',
  'ip-address': '127.0.0.1',
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8'
}

test('createRequestBody() adds claim, device fingerprint and web UI version to request body', (t) => {
  const APP_VERSION = 'myAppVersion'

  const config = {
    environment: {
      APP_VERSION
    }
  }

  const steps = [
    {
      requestBody: (session) => ({
        bodyValueOne: session.claim['valueOne']
      })
    },
    {
      requestBody: (session) => ({
        bodyValueTwo: session.claim['valueTwo']
      })
    }
  ]

  const request = {
    session: {
      claim: {
        valueOne: 'one',
        valueTwo: 'two'
      }
    },
    headers: requestHeaders
  }

  const expectedBody = {
    claimant: {
      bodyValueOne: 'one',
      bodyValueTwo: 'two'
    },
    deviceFingerprint: expectedFingerprint,
    webUIVersion: APP_VERSION
  }

  const bodyToPost = createRequestBody(config, steps, request)

  t.deepEqual(bodyToPost, expectedBody)
  t.end()
})
