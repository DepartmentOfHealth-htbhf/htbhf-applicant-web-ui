const test = require('tape')
const sinon = require('sinon')
const { behaviourForPost, behaviourForGet } = require('./children-dob')

const child = {
  'childName-01': 'Lisa',
  'childDob-day-01': '14',
  'childDob-month-01': '11',
  'childDob-year-01': '1990'
}

test('behaviourForPost() adds childrens DOBs to session on add action', (t) => {
  const newChild = {
    'childName-02': 'Bart',
    'childDob-day-02': '2',
    'childDob-month-02': '3',
    'childDob-year-02': '2001'
  }

  const req = {
    session: {
      children: {
        ...child,
        count: 1
      }
    },
    body: {
      add: 'Add another child',
      ...child,
      ...newChild
    }
  }

  const redirect = sinon.spy()
  const res = { redirect }
  const next = sinon.spy()

  const expected = {
    ...child,
    ...newChild,
    count: 2
  }

  behaviourForPost(req, res, next)

  t.deepEqual(req.session.children, expected, 'adds childrens DOBs to session on add action')
  t.equal(redirect.calledWith('/children-dob'), true, 'redirects on add action')
  t.equal(next.called, false, 'does not call next')
  t.end()
})

test('behaviourForPost() adds childrens DOBs to session on submit', (t) => {
  const req = {
    session: {},
    body: {
      ...child
    }
  }

  const redirect = sinon.spy()
  const res = { redirect }
  const next = sinon.spy()

  const expected = {
    ...child,
    count: 1
  }

  behaviourForPost(req, res, next)

  t.deepEqual(req.session.children, expected, 'adds childrens DOBs to session on submit')
  t.equal(redirect.called, false, 'does not redirect')
  t.equal(next.called, true, 'calls next')
  t.end()
})

test('behaviourForGet() initialises children in session', (t) => {
  const req = { session: {} }
  const res = { locals: {} }
  const next = sinon.spy()

  behaviourForGet(req, res, next)

  t.equal(req.session.children.count, 0, 'initialises children in session')
  t.end()
})

test('behaviourForGet() adds childrens DOBs to res.locals', (t) => {
  const req = {
    session: {
      children: {
        ...child,
        count: 1
      }
    }
  }

  const res = {
    locals: {}
  }

  const next = sinon.spy()

  const expected = {
    ...child,
    count: 1
  }

  behaviourForGet(req, res, next)

  t.deepEqual(res.locals.children, expected, 'adds childrens DOBs to res.locals')
  t.equal(next.called, true, 'calls next')
  t.end()
})
