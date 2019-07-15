const test = require('tape')
const sinon = require('sinon')
const { setChildrenInSessionForPost } = require('./set-children-in-session')

const child = {
  'childDobName-1': 'Lisa',
  'childDob-day-1': '14',
  'childDob-month-1': '11',
  'childDob-year-1': '1990'
}

const newChild = {
  'childDobName-2': 'Bart',
  'childDob-day-2': '2',
  'childDob-month-2': '3',
  'childDob-year-2': '2001'
}

test('setChildrenInSessionForPost() initialises counters in session', (t) => {
  const req = {
    session: {},
    body: {}
  }
  const res = { locals: {} }
  const next = sinon.spy()

  setChildrenInSessionForPost(req, res, next)

  t.equal(req.session.children.inputCount, 0, 'initialises input count in session')
  t.equal(req.session.children.childCount, 0, 'initialises children count in session')
  t.equal(next.called, true, 'calls next')
  t.end()
})

test('setChildrenInSessionForPost() sets childrens DOBs in session', (t) => {
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

  const res = {
    locals: {}
  }

  const next = sinon.spy()

  const expected = {
    ...child,
    ...newChild,
    childCount: 2,
    inputCount: 2
  }

  setChildrenInSessionForPost(req, res, next)

  t.deepEqual(req.session.children, expected, 'adds childrens DOBs to session')
  t.deepEqual(res.locals.children, expected, 'adds childrens DOBs to locals')
  t.equal(next.called, true, 'calls next')
  t.end()
})
