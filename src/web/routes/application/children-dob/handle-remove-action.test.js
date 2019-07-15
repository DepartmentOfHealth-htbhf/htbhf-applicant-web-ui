const test = require('tape')
const sinon = require('sinon')
const { handleRemoveAction } = require('./handle-remove-action')
const { REMOVE_CHILD_INDEX_KEY } = require('./constants')

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

test('handleRemoveAction() removes child’s DOB from session on remove action', (t) => {
  const req = {
    session: {
      children: {
        ...child,
        ...newChild,
        childCount: 2,
        inputCount: 2
      }
    },
    body: {
      ...child,
      ...newChild,
      [REMOVE_CHILD_INDEX_KEY]: '1'
    }
  }

  const redirect = sinon.spy()

  const res = {
    redirect,
    locals: {}
  }

  const next = sinon.spy()

  const expected = {
    'childDobName-1': 'Bart',
    'childDob-day-1': '2',
    'childDob-month-1': '3',
    'childDob-year-1': '2001',
    'childCount': 1,
    'inputCount': 1
  }

  handleRemoveAction(req, res, next)

  t.deepEqual(req.session.children, expected, 'removes child’s DOB from session on remove action')
  t.equal(redirect.calledWith('/children-dob'), true, 'redirects on remove action')
  t.equal(next.called, false, 'does not call next')
  t.end()
})

test('handleRemoveAction() does nothing when no remove action', (t) => {
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
    'childDobName-1': 'Lisa',
    'childDob-day-1': '14',
    'childDob-month-1': '11',
    'childDob-year-1': '1990',
    'childCount': 1,
    'inputCount': 1
  }

  handleRemoveAction(req, res, next)

  t.deepEqual(req.session.children, expected, 'does not mutate children')
  t.equal(redirect.calledWith('/children-dob'), false, 'does not redirect')
  t.equal(next.called, true, 'calls next')
  t.end()
})

test('handleRemoveAction() removes child’s DOB from session on remove action when only one child exists', (t) => {
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
      [REMOVE_CHILD_INDEX_KEY]: '1'
    }
  }

  const redirect = sinon.spy()

  const res = {
    redirect,
    locals: {}
  }

  const next = sinon.spy()

  const expected = {
    'childCount': 0,
    'inputCount': 1
  }

  handleRemoveAction(req, res, next)

  t.deepEqual(req.session.children, expected, 'removes child’s DOB from session on remove action')
  t.equal(redirect.calledWith('/children-dob'), true, 'redirects on remove action')
  t.equal(next.called, false, 'does not call next')
  t.end()
})

test('handleRemoveAction() throws an error on remove action when index is less than 1', (t) => {
  const req = {
    session: {
      children: {
        childCount: 0,
        inputCount: 1
      }
    },
    body: {
      [REMOVE_CHILD_INDEX_KEY]: '0'
    }
  }

  const redirect = sinon.spy()

  const res = {
    redirect,
    locals: {}
  }

  t.throws(() => handleRemoveAction(req, res, () => {}), /Unable to remove index 0/)
  t.end()
})
