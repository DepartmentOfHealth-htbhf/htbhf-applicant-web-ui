const test = require('tape')
const sinon = require('sinon')
const { behaviourForPost, behaviourForGet } = require('./children-dob')

const child = {
  'childName-01': 'Lisa',
  'childDob-day-01': '14',
  'childDob-month-01': '11',
  'childDob-year-01': '1990'
}

const newChild = {
  'childName-02': 'Bart',
  'childDob-day-02': '2',
  'childDob-month-02': '3',
  'childDob-year-02': '2001'
}

test('behaviourForPost() initialises counters in session', (t) => {
  const req = {
    session: {},
    body: {}
  }
  const res = { locals: {} }
  const next = sinon.spy()

  behaviourForPost(req, res, next)

  t.equal(req.session.children.inputCount, 0, 'initialises input count in session')
  t.equal(req.session.children.childCount, 0, 'initialises children count in session')
  t.end()
})

test('behaviourForPost() adds childrens DOBs to session on add action', (t) => {
  const req = {
    session: {
      children: {
        ...child,
        childCount: 1,
        inputCount: 1
      }
    },
    body: {
      add: 'Add another child',
      ...child,
      ...newChild
    }
  }

  const redirect = sinon.spy()

  const res = {
    redirect,
    locals: {}
  }

  const next = sinon.spy()

  const expected = {
    ...child,
    ...newChild,
    childCount: 2,
    inputCount: 3
  }

  behaviourForPost(req, res, next)

  t.deepEqual(req.session.children, expected, 'adds childrens DOBs to session on add action')
  t.equal(redirect.calledWith('/children-dob'), true, 'redirects on add action')
  t.equal(next.called, false, 'does not call next')
  t.end()
})

test('behaviourForPost() adds childrens DOBs to session on submit', (t) => {
  const req = {
    session: {
      children: {
        ...child,
        childCount: 1,
        inputCount: 1
      }
    },
    body: {
      ...child,
      ...newChild
    }
  }

  const redirect = sinon.spy()

  const res = {
    redirect,
    locals: {}
  }

  const next = sinon.spy()

  const expected = {
    ...child,
    ...newChild,
    childCount: 2,
    inputCount: 2
  }

  behaviourForPost(req, res, next)

  t.deepEqual(req.session.children, expected, 'adds childrens DOBs to session on submit')
  t.deepEqual(res.locals.children, expected, 'adds childrens DOBs to res.locals')
  t.equal(redirect.called, false, 'does not redirect')
  t.equal(next.called, true, 'calls next')
  t.end()
})

test('behaviourForGet() initialises children in session', (t) => {
  const req = { session: {} }
  const res = { locals: {} }
  const next = sinon.spy()

  behaviourForGet(req, res, next)

  t.equal(req.session.children.inputCount, 1, 'initialises input count in session')
  t.equal(req.session.children.childCount, 0, 'initialises children count in session')
  t.equal(next.called, true, 'calls next')
  t.end()
})

test('behaviourForGet() adds childrens DOBs to res.locals', (t) => {
  const req = {
    session: {
      children: {
        ...child,
        childCount: 1,
        inputCount: 1
      }
    }
  }

  const res = {
    locals: {}
  }

  const next = sinon.spy()

  const expected = {
    ...child,
    childCount: 1,
    inputCount: 1
  }

  behaviourForGet(req, res, next)

  t.deepEqual(res.locals.children, expected, 'adds childrens DOBs to res.locals')
  t.equal(next.called, true, 'calls next')
  t.end()
})
