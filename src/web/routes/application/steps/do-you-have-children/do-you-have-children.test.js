const test = require('tape')
const sinon = require('sinon')
const { behaviourForPost } = require('./do-you-have-children')
const { YES, NO } = require('../common/constants')

const children = {
  'childName-1': 'Lisa',
  'childDob-1': '2018-02-22'
}

test('behaviourForPost() removes children from session when answer to “Do you have children” is “no”', (t) => {
  const req = {
    session: {
      children
    },
    body: {
      doYouHaveChildren: NO
    }
  }

  const res = {}
  const next = sinon.spy()

  behaviourForPost()(req, res, next)

  t.equal(req.session.children, null, 'removes children from session')
  t.equal(next.called, true, 'calls next')
  t.end()
})

test('behaviourForPost() does not update children when answer to “Do you have children” is “yes”', (t) => {
  const req = {
    session: {
      children
    },
    body: {
      doYouHaveChildren: YES
    }
  }

  const res = {}
  const next = sinon.spy()

  behaviourForPost()(req, res, next)

  t.deepEqual(req.session.children, children, 'does not update children')
  t.equal(next.called, true, 'calls next')
  t.end()
})
