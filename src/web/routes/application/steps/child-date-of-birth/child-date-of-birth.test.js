const test = require('tape')
const sinon = require('sinon')
const { behaviourForGet } = require('./child-date-of-birth')

const child = {
  'childDobName-1': 'Lisa',
  'childDob-day-1': '14',
  'childDob-month-1': '11',
  'childDob-year-1': '1990'
}

test('behaviourForGet() initialises children in session', (t) => {
  const req = { session: {} }
  const res = { locals: {} }
  const next = sinon.spy()

  behaviourForGet()(req, res, next)

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

  behaviourForGet()(req, res, next)

  t.deepEqual(res.locals.children, expected, 'adds childrens DOBs to res.locals')
  t.equal(next.called, true, 'calls next')
  t.end()
})
