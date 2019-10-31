const test = require('tape')
const sinon = require('sinon')
const { handleAddAction } = require('./handle-add-action')
const { ADD_CHILD_KEY } = require('./constants')

const child = {
  'childDobName-1': 'Lisa',
  'childDob-day-1': '14',
  'childDob-month-1': '11',
  'childDob-year-1': '1990'
}

test('handleAddAction() increments the input count in session on add action', (t) => {
  const req = {
    session: {
      children: {
        ...child,
        childCount: 1,
        inputCount: 1
      }
    },
    body: {
      [ADD_CHILD_KEY]: 'Add another child',
      ...child
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
    childCount: 1,
    inputCount: 2,
    autofocus: true
  }

  handleAddAction(req, res, next)

  t.deepEqual(req.session.children, expected, 'increments input count')
  t.equal(redirect.calledWith('/child-date-of-birth'), true, 'calls redirect')
  t.equal(next.called, false, 'does not call next')
  t.end()
})

test('handleAddAction() does nothing when not an add action', (t) => {
  const req = {
    session: {
      children: {
        ...child,
        childCount: 1,
        inputCount: 1
      }
    },
    body: {
      ...child
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
    childCount: 1,
    inputCount: 1
  }

  handleAddAction(req, res, next)

  t.deepEqual(req.session.children, expected, 'does not mutate children')
  t.equal(redirect.calledWith('/child-date-of-birth'), false, 'does not call redirect')
  t.equal(next.called, true, 'calls next')
  t.end()
})
