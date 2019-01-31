const test = require('tape')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

test('handlePost() should add errors and claim to locals if errors exist', (t) => {
  const errors = ['error']

  const { handlePost } = proxyquire('./handle-post', {
    'express-validator/check': {
      validationResult: () => ({
        isEmpty: () => false,
        array: () => errors
      })
    }
  })

  const claim = 'claim'
  const req = { body: claim }
  const res = { locals: {} }
  const next = sinon.spy()

  handlePost(req, res, next)

  t.deepEqual(res.locals.errors, errors, 'it should add errors to locals')
  t.deepEqual(res.locals.claim, claim, 'it should add claim to locals')
  t.equal(next.called, true, 'it should call next()')
  t.end()
})

test('handlePost() adds persistentAttributes to the session to if no errors exist', (t) => {
  const { handlePost } = proxyquire('./handle-post', {
    'express-validator/check': {
      validationResult: () => ({
        isEmpty: () => true
      })
    }
  })

  const req = {
    session: {
      claim: {
        other: 'claim data',
        shouldBeNull: 'not null'
      },
      persistentAttributes: {
        new: 'claim data',
        shouldBeNull: null
      }
    },
    body: {
      somethingElse: 'claim data'
    }
  }

  const next = sinon.spy()

  const expectedClaim = {
    other: 'claim data',
    new: 'claim data',
    shouldBeNull: null
  }

  handlePost(req, {}, next)

  t.deepEqual(req.session.claim, expectedClaim, 'it should add persistentAttributes to session.claim')
  t.equal(next.called, true, 'it should call next()')
  t.end()
})

test('handlePost() calls next() with error on error', (t) => {
  const { handlePost } = proxyquire('./handle-post', {
    'express-validator/check': {
      validationResult: () => ({
        isEmpty: () => { throw new Error('error') },
        array: () => []
      })
    }
  })

  const req = {
    session: {
      claim: {}
    },
    body: {}
  }

  const res = { locals: {} }
  const next = sinon.spy()

  handlePost(req, res, next)

  t.equal(next.calledWith(sinon.match.instanceOf(Error)), true, 'it should call next() with error')
  t.end()
})
