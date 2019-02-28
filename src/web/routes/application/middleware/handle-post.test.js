const test = require('tape')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const defaultValidator = {
  'express-validator/check': {
    validationResult: () => ({
      isEmpty: () => true
    })
  }
}

const steps = [{ path: '/first', next: '/second' }, { path: '/second' }]

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

  handlePost(steps)(req, res, next)

  t.deepEqual(res.locals.errors, errors, 'it should add errors to locals')
  t.deepEqual(res.locals.claim, claim, 'it should add claim to locals')
  t.equal(next.called, true, 'it should call next()')
  t.end()
})

test('handlePost() adds body to the session if no errors exist', (t) => {
  const { handlePost } = proxyquire('./handle-post', { ...defaultValidator })

  const req = {
    session: {
      claim: {
        other: 'claim data'
      }
    },
    body: {
      new: 'claim data'
    }
  }

  const next = sinon.spy()

  const expected = {
    other: 'claim data',
    new: 'claim data'
  }

  handlePost(steps)(req, {}, next)

  t.deepEqual(req.session.claim, expected, 'it should add body to session')
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

  handlePost(steps)(req, res, next)

  t.equal(next.calledWith(sinon.match.instanceOf(Error)), true, 'it should call next() with error')
  t.end()
})

test('handlePost() adds next allowed step to session', (t) => {
  const { handlePost } = proxyquire('./handle-post', { ...defaultValidator })

  const req = {
    session: {},
    path: '/first'
  }

  const res = {}
  const next = () => {}

  handlePost(steps)(req, res, next)

  t.equal(req.session.nextAllowedStep, '/second', 'it should add next allowed step to session')
  t.end()
})

test('handlePost() calls next() with error if no next property exists on step', (t) => {
  const { handlePost } = proxyquire('./handle-post', { ...defaultValidator })

  const req = {
    session: {},
    path: '/second'
  }

  const res = {}
  const next = sinon.spy()

  handlePost(steps)(req, res, next)

  t.equal(next.calledWith(sinon.match.instanceOf(Error)), true, 'it should throw an error')
  t.end()
})

test.only('handlePost() calls next() with error if next property is blank', (t) => {
  const { handlePost } = proxyquire('./handle-post', { ...defaultValidator })

  const req = {
    session: {},
    path: '/second',
    next: ''
  }

  const res = {}
  const next = sinon.spy()

  handlePost(steps)(req, res, next)

  t.equal(next.calledWith(sinon.match.instanceOf(Error)), true, 'it should throw an error')
  t.end()
})
